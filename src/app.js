var HelloWorldLayer = cc.Layer.extend({
  sprite: null,
  movementSpeed: 0,
  maxMovementSpeed: 200,

  ctor: function () {
    this._super();

    this.sprite = new cc.Sprite(res.Character_png);
    this.sprite.runAction(cc.sequence(cc.moveBy(1.5, 200, 0)));
    this.sprite.setPosition(cc.p(200, 200));
    this.addChild(this.sprite);

    var keyboardListener = cc.EventListener.create({
      event: cc.EventListener.KEYBOARD,
      onKeyPressed: this.onKeyDown.bind(this),
      onKeyReleased: this.onKeyUp.bind(this),
    });

    cc.eventManager.addListener(keyboardListener, this);

    this.scheduleUpdate();
  },

  onKeyDown: function (keyCode, event) {
    switch (keyCode) {
      case cc.KEY.left:
        this.movementSpeed = -this.maxMovementSpeed;
        break;
      case cc.KEY.right:
        this.movementSpeed = this.maxMovementSpeed;
        break;
      default:
        break;
    }
  },

  onKeyUp: function (keyCode, event) {
    switch (keyCode) {
      case cc.KEY.left:
      case cc.KEY.right:
        this.movementSpeed = 0;
        this.sprite.stopAllActions();
        break;
      default:
        break;
    }
  },

  update: function (dt) {
    if (this.movementSpeed !== 0) {
      this.sprite.x += this.movementSpeed * dt;

      this.sprite.x = Math.max(0, Math.min(this.sprite.x, cc.winSize.width));
    }
  },
});

var HelloWorldScene = cc.Scene.extend({
  onEnter: function () {
    this._super();
    var layer = new HelloWorldLayer();
    this.addChild(layer);
  },
});

//-----------------------------------------------------------------------------------
//sai_Scenefile.js
//-----------------------------------------------------------------------------------
/*:ja
 * @plugindesc 補助ウインドウを使ったSS付セーブ画面
 *
 * @param bgBitmapFile
 * @desc セーブ／ロード画面背景にするビットマップファイルです。
 * img/pictures に置いてください。
 * @default 
 *
 *
 * @help このプラグインには、プラグインコマンドはありません。
 *
 * 制作者：sairi　[Twitter＠sairi55]
 * SPECIALTHANKS
 * 翠様、尾角つの様
 * ツクマテお呼びTwitterで何時も構ってくれるツクラーの皆様
 *  
 * 無責任に行きたいので他のプラグインとの競合等により
 * バグ、エラーが発生した場合の対応、責任は取れません。
 * 改変がし易いように説明も入れたつもりですが
 * 全てご使用は自己責任でお願い致します。
 *  
 * 使用規約：
 * ジャンル無制限、改変可
 * 素材自体の販売禁止
 * ゲームに含めての再配布は可
 *  
 * クレジットの記載は強制しませんが入れてくれると嬉しいです。
 * あと教えてくれるともっと嬉しいです。
 * 以上宜しくお願いします。
 *  
 *  
*/



(function() {
	var parameters = PluginManager.parameters('sai_Scenefile');
    var bgBitmapFile = parameters['bgBitmapFile'] || '';
	
	
//Bitmap-----------------------------------------------------------------------------
if (!Bitmap.prototype.save){
    Bitmap.prototype.toDataURL = function(){
 // jpegとPNGサイズが小さくなる方を返す
           var png = this._canvas.toDataURL('image/png');
            var jpeg = this._canvas.toDataURL('image/jpeg');
            return (png.length < jpeg.length) ? png : jpeg;

    };
}

//DataManager-----------------------------------------------------------------------------
var DM_LSImage = DataManager.loadSavefileImages;
DataManager.loadSavefileImages = function(info){
    DM_LSImage.call(this, info);
    if (info.snapUrl){
		var DH = Decrypter.hasEncryptedImages;//暗号化してるかどうかのフラグを一旦適当な変数に保存
		Decrypter.hasEncryptedImages = false;//その場合一時的にfalse
         ImageManager.loadNormalBitmap(info.snapUrl);
		Decrypter.hasEncryptedImages = DH;    //フラグを戻す 
    }
};

var DM_MSInfo = DataManager.makeSavefileInfo;//セーブファイルの内容
DataManager.makeSavefileInfo = function(){
    var info = DM_MSInfo.call(this);
	info.location = $dataMap.displayName != "" ? $dataMap.displayName : $dataMapInfos[$gameMap.mapId()].name;
　  info.level = $gameParty.exists() ? $gameParty.members()[0].level : null;
	info.gold = $gameParty.gold();        
    info.map_id = $gameMap.mapId();
    info.saveString = $gameVariables.value(59);
　　var bitmap = this.makeSavefileBitmap();
    if (bitmap){
        info.snapUrl = bitmap.toDataURL();
    }
    return info;
};

DataManager.makeSavefileBitmap = function(){//セーブファイル用のビットマップを作成
    var bitmap = $gameTemp.getSavefileBitmap();
    if (!bitmap){
        return null;
    }
    var scale = 0.30;
    var newBitmap = new Bitmap(bitmap.width * scale, bitmap.height * scale);
    newBitmap.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0, newBitmap.width, newBitmap.height);
    return newBitmap;
};

//Game_Temp-----------------------------------------------------------------------------
var Game_Temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function(){
    Game_Temp_initialize.call(this);
    this._savefileBitmap = null;
};

Game_Temp.prototype.setSavefileBitmap = function(bitmap){
    this._savefileBitmap = bitmap;
};

Game_Temp.prototype.getSavefileBitmap = function(){
    if (this._savefileBitmap){
        return this._savefileBitmap;
    }
    else{
        return SceneManager._backgroundBitmap;
    }
};

//---------------------------------------------------------------------------------
Window_SavefileList.prototype.maxVisibleItems = function() {
    return 20;　//セーブファイルリストを表示する数
};
Window_SavefileList.prototype.maxCols = function() {
    return 2;　//セーブファイルリストの列数
};
Window_SavefileList.prototype.standardFontSize = function() {
    return 16;　//セーブファイルリストのフォントサイズ
};
Window_Help.prototype.standardFontSize = function() {
    return 18;　//ヘルプウインドウのフォントサイズ
};
SceneManager.snapForBackground = function() {
    this._backgroundBitmap = this.snap();　//モーションブラーを取り外す

};
//----------------------------------------------------------------------------------
    var _Scene_File_create = Scene_File.prototype.create;
    Scene_File.prototype.create = function() {
        _Scene_File_create.call(this);
        this._listWindow.height = 380;
		//ステータスウインドウの配置
        this._statusWindow = new Window_SavefileStatus(0, 203, 550, 230);
        this._statusWindow.setMode(this.mode());
        this._listWindow.statusWindow = this._statusWindow;
		// セーブ画面全てのウインドウを透明にする
		this._statusWindow.opacity = 0;
		this._helpWindow.opacity = 0;
        this._listWindow.opacity = 0;
		//---------------------------------------
        this._listWindow.callUpdateHelp();
		//ヘルプウインドウの配置
		this._helpWindow.x = 0;
		this._helpWindow.y = 55;
        this.addWindow(this._statusWindow);
		this.addChildAt(this._helpWindow,2); //helpWindowの表示順位を入れ替える		
    };

    var _Scene_File_start = Scene_File.prototype.start;
    Scene_File.prototype.start = function() {
        _Scene_File_start.call(this);
        this._listWindow.ensureCursorVisible();
        this._listWindow.callUpdateHelp();
    };

Window_SavefileList.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, 130, 110, 280, 380);
    this.activate();
    this._mode = null;
};
Window_SavefileList.prototype.itemHeight = function() {
    return this.padding * 1.8;
};

    var _Window_SavefileList_callUpdateHelp =
            Window_SavefileList.prototype.callUpdateHelp;
    Window_SavefileList.prototype.callUpdateHelp = function() {
        _Window_SavefileList_callUpdateHelp.call(this);
        if (this.active && this.statusWindow) {
            this.statusWindow.setId(this.index() + 1);
        }
    };

    function Window_SavefileStatus() {
        this.initialize.apply(this, arguments);
    }

    Window_SavefileStatus.prototype = Object.create(Window_Base.prototype);
    Window_SavefileStatus.prototype.constructor = Window_SavefileStatus;

    Window_SavefileStatus.prototype.initialize = function(x, y, width, height) {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this._id = 1;
    };

    Window_SavefileStatus.prototype.setMode = function(mode) {
        this._mode = mode;
    };

    Window_SavefileStatus.prototype.setId = function(id) {
        this._id = id;
		this.contents.fontSize = 18;
        this.refresh();
    };

    Window_SavefileStatus.prototype.refresh = function() {
        this.contents.clear();
    var id = this._id;
    var info = DataManager.loadSavefileInfo(id);
	var valid = DataManager.isThisGameFile(id);
    if (info){
        var rect = this.contents.rect;
        this.drawSnappedImage(info, rect, valid);
		this.drawFileId(id, rect.x, rect.y);
		this.drawContents(info, rect.x, valid);
    }
    };
	
//セーブステータス画面に表示させる名称と位置------------------------------------
//現状[ファイル名+ID、プレイ時間、地名、持ち金]、名称変更は''の中の文字で
    Window_SavefileStatus.prototype.drawFileId = function(id, x, y) {
        this.drawText(TextManager.file + ' ' + id, x, y, 180);
		this.drawText('总时间：' + ' ', 230, 130, 80);
		this.drawText('所持金：' + ' ', 230, 100, 80);
		this.drawText('8月' + ' ', 230, 70, 80);
    };

    Window_SavefileStatus.prototype.drawContents = function(info, x, valid) {
        this.drawText(info.playtime, 300, 130, 200);
        this.drawText(info.saveString + "日", 260, 70, 200);
		if (info.location) {
		}
		if (info.level) {
			this.drawText(TextManager.levelA + " " + info.level, 2, 250, 60);
		}
		if (typeof info.gold === 'number') {　//値が数字の時に通る
			this.drawText(info.gold + " " + TextManager.currencyUnit, 300, 100, 200);
		}

		if (info.level) {
			this.drawText(TextManager.levelA + " " + info.level, 2, 250, 60);
		}
		if (valid) {
            this.drawPartyCharacters(info, 70, 290);
        }

    };


//ステータスウインドウに表示させるPTの詳細--------------------------------------
Window_SavefileStatus.prototype.drawPartyCharacters = function(info, x, y) {
    if (info.characters) {
        for (var i = 0; i < info.characters.length; i++) {
            var data = info.characters[i];
            this.drawCharacter(data[0], data[1], x + i * 48, y);
        }
    }
};
//セーブファイルリストの中身-------------------------------------------------
Window_SavefileList.prototype.drawItem = function(index) {
    var id = index + 1;
    var valid = DataManager.isThisGameFile(id);
    var info = DataManager.loadSavefileInfo(id);
    var rect = this.itemRectForText(index);
    this.resetTextColor();
    this.drawFileId(id, rect.x, rect.y);

};
//セーブファイルの画像を表示
Window_SavefileStatus.prototype.drawSnappedImage = function(info, rect, valid){
    if (!(valid && info.snapUrl)){
        return;
    }
　　var DH = Decrypter.hasEncryptedImages;//暗号化してるかどうかのフラグを一旦適当な変数に保存
	Decrypter.hasEncryptedImages = false;//その場合一時的にfalse
    var bitmap = ImageManager.loadNormalBitmap(info.snapUrl);
	Decrypter.hasEncryptedImages = DH;    //フラグを戻す 
    var dh = 0;
    var dw = 0;
    var dx = rect.x + 0;　//表示位置X
    var dy = rect.y + 40;　　//表示位置Y

    this.changePaintOpacity(true);
    this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, dx, dy, dw, dh);
};

    //セーブ画面の背景読み込み
    var _Scene_File_createBackground = Scene_File.prototype.createBackground;
    Scene_File.prototype.createBackground = function(){
        if(bgBitmapFile){
			Scene_MenuBase.prototype.createBackground.call(this);//追加行
            this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap =
             ImageManager.loadPicture(bgBitmapFile);
            this.addChild(this._backgroundSprite);
            return;
        }
        _Scene_File_createBackground.call(this);    // 背景ファイルが無い場合
    };


})();
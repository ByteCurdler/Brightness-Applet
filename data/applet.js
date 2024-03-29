// Thanks to:
//   force-quit@cinnamon.org for basic applet
//   redshift@marvel4u for popup menu

const Lang = imports.lang;
const Applet = imports.ui.applet;
const GLib = imports.gi.GLib;
const PopupMenu = imports.ui.popupMenu;
const Gettext = imports.gettext;
const UUID = "brightness@ILikePython256";

const APPLET_DIR = GLib.get_home_dir() + "/.local/share/cinnamon/applets/" + UUID + "/";

const BRIGHT_MIN = 50;
const BRIGHT_MAX = 150;
const BRIGHT_STEP = 5;
const BRIGHT_START = 100;

Gettext.bindtextdomain(UUID, GLib.get_home_dir() + "/.local/share/locale");

function _(str) {
    return Gettext.dgettext(UUID, str)
}

function MyApplet(orientation) {
    this._init(orientation);
}

MyApplet.prototype = {
    __proto__: Applet.IconApplet.prototype,

    _init: function(orientation) {
        Applet.IconApplet.prototype._init.call(this, orientation);

        try {
            this.set_applet_icon_name("display-brightness-symbolic");
            this.set_applet_tooltip(_("Brightness slider"));
            //this.actor.connect('button-release-event', Lang.bind(this, this._onButtonReleaseEvent));

            this.menuManager = new PopupMenu.PopupMenuManager(this);
            this.menu = new Applet.AppletPopupMenu(this, orientation);
            this.menuManager.addMenu(this.menu);

            this._contentSection = new PopupMenu.PopupMenuSection();
            this.menu.addMenuItem(this._contentSection);

            this.brightnessMenuItem = new PopupMenu.PopupMenuItem("", { reactive: false });
            this.menu.addMenuItem(this.brightnessMenuItem);
			
			let sliderPos = (BRIGHT_START - BRIGHT_MIN) / (BRIGHT_MAX - BRIGHT_MIN)
            //brightness slider control
            this._brightnessSlider = new PopupMenu.PopupSliderMenuItem(sliderPos);
            this._brightnessSlider.connect("value-changed", Lang.bind(this, this.brightnessSliderChanged));
            this.menu.addMenuItem(this._brightnessSlider);
            
			this.brightnessSliderChanged(this._brightnessSlider, sliderPos);
        }
        catch (e) {
            global.logError(e);
        }
    },

    brightnessSliderChanged: function (slider, value) {
        let brightness = parseFloat(value);
        brightness = Math.round(
        	brightness * (BRIGHT_MAX - BRIGHT_MIN) / BRIGHT_STEP
        ) * BRIGHT_STEP + BRIGHT_MIN;
        
        if (this.brightness != brightness) {
		    this.brightness = brightness;
			
		    let brightnessStr = _("Brightness") + ": " + this.brightness + "%";
		    this.brightnessMenuItem.label.text = brightnessStr;
			GLib.spawn_command_line_sync("bash " + APPLET_DIR + "brightness.bash " + (brightness / 100));
		}
    },

    on_applet_clicked: function (event) {
        this.appletClicked = true;
        this.menu.toggle();
    }

};

function main(metadata, orientation) {
    let myApplet = new MyApplet(orientation);
    return myApplet;
}

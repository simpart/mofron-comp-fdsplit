/**
 * @file mofron-comp-fdsplit/index.js
 * @brief folding split component for mofron
 * @author simpart
 */
const mf      = require('mofron');
const Split   = require('mofron-comp-split');
const Click   = require('mofron-event-click');
const Text    = require('mofron-comp-clktext');
const HrzPos  = require('mofron-effect-hrzpos');
const efSize  = require('mofron-effect-size');
const efStyle = require('mofron-effect-style');

mf.comp.FdSplit = class extends Split {
    /**
     * initialize component
     * 
     * @param (mixed) ratio parameter
     *                object: component option
     * @pmap ratio
     * @type private
     */
    constructor (po) {
        try {
            super();
            this.name('FdSplit');
            this.prmOpt(po);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize dom contents
     * 
     * @type private
     */
    initDomConts () {
        try {
            super.initDomConts();
	    this.switch(
	        new Text({
		    style: { "margin-top": "0.2rem" },
		    text: "&laquo;", size: "0.5rem",
		    effect: new HrzPos('right', '0.1rem')
		}),
		new Text({
		    style: { "margin-top": "0.2rem" },
		    text: "&raquo;", size: "0.5rem",
		    effect: new HrzPos('right', '0.1rem')
		})
	    );
	    this.foldWidth("0.5rem");
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * slide config
     * 
     * @type private
     */
    beforeRender () {
        try {
            super.beforeRender();
            if (2 > this.child().length) {
                return;
	    }
	    this.child()[0].child(this.switch());
	    if (true === this.folding()) {
                this.switch()[0].visible(false);
	    } else {
                this.switch()[1].visible(false);
	    }

            /* slide config */
            this.child()[0].effect(
	        new efSize({ width: this.child()[0].width(), eid:2, speed: 300 })
	    );
	    this.child()[0].effect(
	        new efSize({ width: this.foldWidth().toString(), eid: 3, speed: 300 })
	    );
	    this.child()[1].effect(
                new efSize({ width: this.ratio()[1]+'%', eid:2, speed: 300 })
            );
	    this.child()[1].effect(
                new efSize({ eid:3, speed: 300, tag: "FdSplit" })
            );
            
            /* border config */
	    let wid  = mf.func.getSize(this.border().width());
            this.border().effect(
	        new efStyle({
		    style: { "left": this.child()[0].width() }, eid: 2, speed: 300
		})
	    );
            this.border().effect(
	        new efStyle({
		    style: { "left": this.foldWidth().toString() }, eid: 3, speed: 300
		})
	    );
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }

    afterRender () {
        try {
            super.afterRender();
            if (true === this.folding()) {
                this.foldConf(true);
	    }
	}  catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * switch component
     * 
     * @param (component) open state switch component
     * @param (component) close state switch component
     * @return (array) [open comp, close comp]
     * @type parameter
     */
    switch (opn, cls) {
        try {
	    if (undefined === opn) {
                /* getter */
		return [this.openSwitch(), this.closeSwitch()];
	    }
	    /* setter */
	    this.openSwitch(opn);
	    this.closeSwitch(cls);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
    
    /**
     * open state switch component
     * 
     * @param (component) open state switch component
     * @return (component) open state switch component
     * @type parameter
     */
    openSwitch (prm) {
        try {
            if (undefined !== prm) {
                prm.option({
                    event: new Click([
		        (cp1,cp2,cp3) => { cp3.folding(true); },
			this
		    ])
                });
            }
            return this.innerComp("openSwitch",prm, mf.Component);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * close state switch component
     * 
     * @param (component) close state switch component
     * @return (component) close state switch component
     * @type parameter
     */
    closeSwitch (prm) {
        try {
            if (undefined !== prm) {
                prm.option({
                    event: new Click([
		        (cp1,cp2,cp3) => {
                            cp3.folding(false);
		        },
			this
		    ]),
                });
            }
            return this.innerComp("closeSwitch",prm, mf.Component);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * folding width
     * 
     * @param (string (size)) folding width (default 0.5rem)
     * @return (string (size)) folding width
     * @type parameter
     */
    foldWidth (prm) {
        try {
            return this.member("foldWidth", "size", prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * folding status
     * 
     * @param (boolean) true: folding split component
     *                  false: unfolding split component
     * @return (boolean) folding status
     * @type parameter
     */
    folding (prm) {
        try {
            let ret = this.member("folding", "boolean", prm, false);
            if ((undefined !== prm) && (true === this.target().isPushed())) {
                this.foldConf(prm);
	    }
            return ret;

	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    /**
     * folding configure
     * 
     * @param (boolean) true: folding split
     *                  false: unfolding split
     * @type function
     */
    foldConf (prm) {
        try {
	    let fds = this;
            if (true === prm) {
                /* close split */
                /* change switch contents */
                this.openSwitch().visible(
                    false,
                    () => {
                        try {
                            fds.closeSwitch().visible(true);
                        } catch (e) {
                            console.error(e.stack);
                            throw e;
                        }
                    }
                );
                this.child()[0].execEffect(3);
                this.child()[1].execEffect(3);
                this.border().execEffect(3);
            } else if (false === prm) {
                /* open split */
                /* change switch contents */
                this.closeSwitch().visible(
                    false,
                    () => {
                        try {
                            fds.openSwitch().visible(true);
                        } catch (e) {
                            console.error(e.stack);
                            throw e;
                        }
                    }
                );
                this.child()[0].execEffect(2);
                this.child()[1].execEffect(2);
                this.border().execEffect(2);
            }
	} catch (e) {
            console.error(e.stack);
	    throw e;
	}
    }

    /**
     * split width
     * 
     * @param (string (size)) split width
     * @return (string (size)) split width
     * @type parameter
     */
    width (prm, opt) {
        try {
            let ret = super.width(prm, opt);
            if ( (undefined !== prm) &&
                 (1 < this.child().length) ) {
                /* setter */
                /* folding config for child[1] */
                let eff_siz = this.child()[1].effect(["Size", "FdSplit"]);
                if (null !== eff_siz) {
		    let chd1_wid = mf.func.sizeDiff(prm, this.foldWidth().toPxnum()+'px');
                    eff_siz.width(chd1_wid);
		    if (true === this.folding()) {
                        this.child()[1].width(chd1_wid);
		    }
                }
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mf.comp.FdSplit;
/* end of file */

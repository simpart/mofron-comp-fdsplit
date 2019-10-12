/**
 * @file mofron-comp-fdsplit/index.js
 * @brief folding split component for mofron
 * @author simpart
 */
const mf      = require('mofron');
const Split   = require('mofron-comp-split');
const Switch  = require('mofron-comp-clksw');
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
                new Switch({
		    child: [ new Text({ text: "&laquo;" }), new Text({ text: "&raquo;" }) ],
		    style: {
		        "margin-top" : "0.2rem",
			"position" : "absolute",
			"right" : "0.2rem"
                    },
                    height: "1rem",
                })
            );
	    this.foldwid("0.5rem");
	    this.draggable(false);
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
            if (1 < this.child().length) {
                this.child()[0].style({ "position" : "relative" });
                this.child()[0].addChild(this.switch());
            }
            this.switch().beforeRender();
            
	    if (2 > this.child().length) {
                return;
            }
            
            /* slide config */
            this.child()[0].effect([
		new efSize({ eid:2, tag: "FdSplit", width: this.foldwid() }),
                new efSize({ eid:3, tag: "FdSplit", width: this.ratio()[0] + '%' })
            ]);
            this.child()[1].effect([
                new efSize({ eid:2, tag: "FdSplit" }),
                new efSize({ eid:3, tag: "FdSplit", width: this.ratio()[1] + '%' })
            ]);
            /* berder config */
            this.border().effect([
	        new efStyle({
		    eid: 2, tag: "FdSplit", style: { "left": this.foldwid().toString() }
		}),
		new efStyle({ eid:3, tag: "FdSplit", style: { "left": this.ratio()[0] + '%' } })
	    ]);

	    if (null === this.speed()) {
                this.speed(300);
	    }
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
    
    /**
     * set folding config
     * 
     * @type private
     */
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
     * @param (mofron-comp-switch) folding switch component
     * @return (mofron-comp-switch) folding switch component
     * @type parameter
     */
    switch (prm) {
        try {
	    if (true === mf.func.isInclude(prm,"Switch")) {
	        let sw_evt = (s1,s2,s3) => {
                    try { s3.folding(!s3.folding()); } catch (e) {
                        console.error(e.stack);
			throw e;
		    }
		}
                prm.switchEvent(sw_evt,this);
	    }
	    return this.innerComp("switch", prm);
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
            let cchd = this.child()[0].child();
            for (let cchd_idx=1; cchd_idx < cchd.length ; cchd_idx++) {
                cchd[cchd_idx].visible(!prm);
	    }
            
            if (true === prm) {
                /* close split */
                this.child()[0].execEffect(2);
                this.child()[1].execEffect(2);
                this.border().execEffect(2);
            } else if (false === prm) {
                /* open split */
                this.child()[0].execEffect(3);
                this.child()[1].execEffect(3);
                this.border().execEffect(3);
            }
	} catch (e) {
            console.error(e.stack);
	    throw e;
	}
    }
    
    /**
     * width for folding status
     * 
     * @param (string (size)) folding width
     * @return (string (size)) folding width 
     * @type parameter
     */
    foldwid (prm) {
        try { return this.member("foldwid", "size", prm); } catch (e) {
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
            if ( (undefined !== prm) && (1 < this.child().length) ) {
                this.child()[1].effectOpt(
		    { width: mf.func.sizeDiff(prm, this.foldwid() )},
		    { eid:2, tag: "FdSplit" }
		);
	    }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * folding speed
     * 
     * @param (number) folding speed
     * @return (number) folding speed
     * @type parameter
     */
    speed (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return this.child()[0].effectOpt({ speed:prm }, { tag: "FdSplit" });
	    }
	    /* setter */
            this.child()[0].effectOpt({ speed:prm }, { tag: "FdSplit" });
            this.child()[1].effectOpt({ speed:prm }, { tag: "FdSplit" });
	    this.border().effectOpt({ speed:prm }, { tag: "FdSplit" });
	} catch (e) {
	    console.error(e.stack);
	    throw e;
	}
    }
}
module.exports = mf.comp.FdSplit;
/* end of file */

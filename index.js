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
	    
            /* set switch component */
            this.switch(
                new Switch({
		    child: [ new Text({ text: "&laquo;" }), new Text({ text: "&raquo;" }) ],
		    style: {
			"position" : "absolute",
			"top"   : "0.2rem",
			"right" : "0.2rem"
                    },
                    height: "1rem",
                })
            );
	    
            /* set folding config */
	    this.foldwid("0.5rem");
	    this.draggable(false);
	    this.foldingEvent(this.foldConf);
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

            this.child()[0].style({ "position" : "relative" });
            this.child()[0].addChild(this.switch());
            this.switch().beforeRender();
            
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
                this.foldConf(this, true);
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
            if ((undefined !== prm) && (this.folding() !== prm)) {
                let evt = this.foldingEvent();
		for (let eidx in evt) {
                    evt[eidx][0](this, prm, evt[eidx][1]);
		}
	    }
            return this.member("folding", "boolean", prm, false);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * folding event function
     *
     * @param (function) event function
     * @param (mixed) event parameter
     * @return (array) [function, param]
     * @type parameter
     */
    foldingEvent (fnc, prm) {
        try {
            if ( (undefined !== fnc) &&
                 ('function' !== typeof fnc) ) {
                throw new Error('invalid parameter');
            }
            return this.arrayMember(
                "foldingEvent",
                "object",
                (undefined !== fnc) ? [fnc,prm] : undefined
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    /**
     * folding configure
     * 
     * @param (mofron-comp-fdsplit) this component object
     * @param (boolean) true: folding split
     *                  false: unfolding split
     * @type private
     */
    foldConf (fds, fld) {
        try {
	    /* left side child visible is false */
            let cchd = fds.child()[0].child();
            for (let cchd_idx=0; cchd_idx < cchd.length ; cchd_idx++) {
	        if (cchd_idx === cchd.length-1) {
                    break;
		}
                cchd[cchd_idx].visible(!fld);
	    }
            
            if (true === fld) {
                /* close split */
                fds.child()[0].execEffect(2);
                fds.child()[1].execEffect(2);
                fds.border().execEffect(2);
		fds.switch().switching(1);
            } else {
                /* open split */
                fds.child()[0].execEffect(3);
                fds.child()[1].execEffect(3);
                fds.border().execEffect(3);
		fds.switch().switching(0);
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
	    if ( (undefined !== prm) && (1 < this.child().length) ) {
	        try {
                    this.child()[1].effectOpt(
                        { width: mf.func.sizeDiff(prm, this.foldwid()) },
			{ eid:2, tag: "FdSplit" }
		    );
		} catch (e) {}
	    }
	    return super.width();
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

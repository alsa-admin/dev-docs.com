/**
 * Created by JetBrains PhpStorm.
 * User: Ken
 * Date: 4/25/12
 * Time: 11:10 PM
 */



/**********************************************************************************************************************************************************
 * GLOBAL VARS/FUNCTIONS                                                                                                                                                                                                                                                                    *
 *********************************************************************************************************************************************************/

/************************************************************* END GLOBAL VARS ***************************************************************************/


/**********************************************************************************************************************************************************
 * DOCUMENT READY                                                                                                                                                                                                                                                                              *
 *********************************************************************************************************************************************************/
$(document).ready(function () {

});

/**********************************************************************************************************************************************************
 * WINDOW LOAD                                                                                                                                                                                                                                                                              *
 *********************************************************************************************************************************************************/
$(window).load(function () {
    var idx = new Index();
    window.IDX = idx;
});


/**********************************************************************************************************************************************************
 * INDEX Obect                                                                                                                                                                                                                                                                              *
 **********************************************************************************************************************************************************
 *
 *
 *
 *
 *
 *
 */
var Index = function() {
    //Member Vars
    this.uri = window.location.pathname;
    //view object
    this.views = {
      _index: '/'
    };

    //INDEX init
    this.init();

    //Object loader
    this.objectLoader();
}

Index.prototype = {
    /**
     * INDEX INIT
     * @desc: put anything here that needs to happen no matter what.
     */
    init: function() {

    },
    /**
     * UTILS
     * @desc: object house for utility methods like get obj length etc.
     */
    utils: {
        /**
         * GET ITEM LENGTH
         * @desc: returns the amount of elements of the given item in the DOM
         * @param itm
         */
        getItemLength: function(itm) {
            return itm.length;
        }
    },
    /**
     * INDEX VIEW OBJECT
     */
    _index: {
        /**
         * INIT
         * @param IDX
         */
        init: function(IDX) {
            var self = this;

            //Load Styles
            this.loadStyles();

            //start the slide show on page load
            this.initSlideShow.init(IDX);

           //bind event
           this.bindEvents();
        },
        /**
         * LOAD STYLES
         * @desc: include any styles that are best processed dynamically
         */
        loadStyles: function() {
            var self = this;

            //Positioning for the last intro slide.
            $('ul#intro-slide-4 li').each(function(idx, itm) {
                if(idx == 0) {
                    $(this).css({
                        'top': ($('section#intro-main').height() - $(this).height()) / 2
                    });
                } else if(idx == 2) {
                    $(this).css({
                        'top': ($('section#intro-main').height() - $(this).height()) / 2 + 6
                    });
                } else {
                    $(this).css({
                        'top': ($('section#intro-main').height() - $(this).height()) / 2,
                        'left': ($('section#intro-main').width() - $(this).width()) / 2
                    });
                }
            });

            //hide all slides that aren't the first child
            $('ul.slide').each(function(idx, itm) {
               if(idx!=0) {
                   $(itm).hide();
               }
            });
        },
        /**
         * BIND EVENTS
         * @desc: general event handler management for DOM elements in this view
         */
        bindEvents: function() {
            var self = this;

            //Submit the email form
            $('input[name=email-submit]').live('click', function(e) {
               e.preventDefault();
               self.addEmail();
            });

        },
        addEmail: function() {
            var self = this;

            $.ajax({
               url: '/index/notify',
               type: 'post',
               dataType: 'json',
               data: {
                   email: $('input[name="signup-input"]').val()
               },
               beforeSend: function(){

               },
               success: function(data) {
                   if(data) {
                       $('section#intro-signup').fadeOut(800, function(){
                           $('section#intro-thank-you').fadeIn(400);
                       });
                   }
               },
               error: function(xhr) {
                   console.log(xhr);
               },
               complete: function(xhr, textStatus, errorThrown, data){
                   console.log('COMEPLTE: ', xhr, textStatus, errorThrown, data);
               }
            });
        },
        /**
         * INIT SLIDE SHOW
         * @desc: main processor for the fade ins and outs
         */
        initSlideShow: {
            /**
             * INIT
             * @desc: start the iteration
             */
            init: function(obj) {
                var base = obj;
                var self = this;

                //delay timer - adjust as desired
                var d = 100;

                //fade in/out each slide
                $('ul.slide').each(function(idx, itm) {
                    if(idx == 0) {
                        setTimeout(function() {
                            self.fadeOut(itm)
                        }, 4500)
                    } else {
                        self.fadeIn(itm, idx, d+=6500);
                    }
                });
            },
            /**
             * FADE IN
             * @desc: fades the slide in
             */
            fadeIn: function(itm, idx, d) {
                setTimeout(function() {
                    $(itm).fadeIn(1000);
                    setTimeout(function() {
                        if(idx !=3) {
                            $(itm).fadeOut(1000)
                        }
                    }, 5500)
                }, d)
            },
            /**
             * FADE OUT
             * @desc: fades the slide out
             */
            fadeOut: function(itm) {
                $(itm).fadeOut(1000);
            }
        }
    }
};

/**
 *  VIEW OBJECT LOADER
 *  @desc:
 */
Index.prototype.objectLoader = function() {
    var self = this;

    for(var prop in self.views) {
        if((self.uri.search(self.views[prop])) > -1) {
            self[prop].init(self);
        }
    }
}
/************************************************************* END ***************************************************************************************/


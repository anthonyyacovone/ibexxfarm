/*
--Toronto-Psycholinguistics-Experiments--

Template that gives examples of everything Ibex can do for experiments
*/

var shuffleSequence = seq(//"intro", "practice", 
    "ready","normal","ready2","medium","ready3","fast","start",
    sepWith("sep", seq("drag")), 
    "next",
    sepWith("sep", startsWith("answer")));
var practiceItemTypes = ["practice"];
var centerItems = true;


var defaults = [
    "Separator", {
        transfer: 1000, //wait for 1000ms
          //other options: "keypress", "click"
        normalMessage: "Please wait for the next sentence.", //message to be displayed
        errorMessage: "Wrong. Please wait for the next sentence." //message to be displayed in red
    },

    "Message", {
        //"html" option is obligatory
        hideProgressBar: false,
        transfer: "keypress"
    },

    "DashedSentence", {
        //"s" option is obligatory
        mode: "self-paced reading"
          //other option: "speeded acceptability"
    },

    "Question", {
        //"as" option is obligatory
        as: ["Yes", "No"],
        hasCorrect: true
          //if a question has a correct answer,
            //keep it as the first element of the "as" option
    },


    //These settings are needed for audio Type 1
    "AcceptabilityJudgment", {
        //"s" option is obligatory
        //"q" option is obligatory
        //"as" option is obligatory
        as: ["OK"],
        //writing the "as" option here means that this is the default for
        //all AcceptabilityJudgment items
        presentAsScale: true, //presents the "as" option as a scale
        instructions: "Use number keys or click boxes to answer.",
        // leftComment: "(Bad)", //displayed on the left side of the scale
        // rightComment: "(Good)", //displayed on the right side of the scale
        //only two audio options available so far
        audioMessage: { html: "<u>Click here to play audio</u>" },
        audioTrigger: "click"
        //do not change this
        //click, we do have another option at this point of time
    },

    "DashedAcceptabilityJudgment", {
        //combination of AcceptabilityJudgment and DashedSentence
        //"s" option is obligatory
        //"q" option is obligatory
        //"as" option is obligatory
        hasCorrect: false
    },

    "Form", {
        //"html" option is obligatory
        hideProgressBar: true,
        continueOnReturn: true,
        saveReactionTime: true
    }
];

var items = [

    /*
    ===================
    SEPARATOR
    The pause needed between each item of the experiment
    ===================
    */

    //ends after timer (1000ms)
    ["sep", "Separator", {transfer: 1000, normalMessage: "Please wait for the next sentence."}],

    //ends when key is press
    ["sep", "Separator", {transfer: "keypress", normalMessage: "Please press any key to continue."}],


    /*
    ===================
    INTRODUCTION
    Can include files for Questionnaires, consent forms etc...
    ===================
    */

    //name of controller
    ["intro",
      //type
      "Form",
      //obligatory option that includes a HTML file that is a questionnaire
      {html: { include: "example_intro.html" },
      //fields that need to have the right format when taking input from user
      validators: {
        //age has to be a number
        age: function (s) { if (s.match(/^\d+$/)) return true; else return "Bad value for \u2018age\u2019"; }
        }
    } ],


    /*
    ===================
    TEXT
    Controllers that work with Text and Questions
    ===================
    */

    //text displayed word by word
    ["practice", "DashedSentence", {s: "This is a practice sentence before the experiment begins."}],

    //all text with MC question
    ["story", "Message", {html: "<center>This is a story you can see all at once!<br><br>Tanya and John were racing. She won.<br><b>Press any key to continue.</b></center>"},
                 "Question", {hasCorrect: false, randomOrder: false,
                              //if a question has a correct answer (hasCorrect: true), you would have to put
                              //that answer as the first element in the "as" option.
                              q: "How would you like to answer this question?",
                              as: ["Press 1 or click here for this answer.", //this would be the correct answer if hasCorrect:true
                                   "Press 2 or click here for this answer.",
                                   "Press 3 or click here for this answer."]}],


    //word by word text with fill in the blank question
    //["story", "DashedSentence", {s: "Remember the story?"},
    // "Form", {html: 'Which player won the race: <input type="text" name="winningPlayer">'}],


     //all text with scaling question
     ["story", "AcceptabilityJudgment", {s:"From a scale of 1 to 9, how has your morning been?",
                                           as:["1","2","3","4","5","6","7","8","9"],
                                            leftComment: "(Bad)",
                                            rightComment: "(Good)"}],


    /*
    ===================
    IMAGE
    Controllers that work with Images and Questions
    ===================
    */

     //image that needs to be clicked
     //["image", "Message", {html:'<img src = "https://raw.githubusercontent.com/labnol/files/master/trex.jpg" />', transfer: "click"}],


     //image with keypress, was a question that has a correct answer
     //let hasCorrect: false, if optinion based question
     //["image", "Message", {html:'<img src = "http://r.ddmcdn.com/s_f/o_1/cx_462/cy_245/cw_1349/ch_1349/w_720/APL/uploads/2015/06/caturday-shutterstock_149320799.jpg" />', transfer: "keypress"},
     //         "Question", {q: "Whats under 'Language'?", //the answer to this is "Knowlege"
     //                       as: ["Knowledge", "Skill", "Math", "Research"]}],

      //image that has a timer with a fill in question
     //["image", "Message", {html:'<img src = "http://r.ddmcdn.com/s_f/o_1/cx_462/cy_245/cw_1349/ch_1349/w_720/APL/uploads/2015/06/caturday-shutterstock_149320799.jpg" /><br><p>Please wait</p>', transfer: 10000},//look at image for 10secs
      //  "Form", {html: 'Write something about image here: <input type="text" name="aboutImg">'}],

     //all text with MC question
    ["z", "Message", {html: "<center>This is a story you can see all at once!<br><br>Tanya and John were racing. She won.<br><b>Press any key to continue.</b></center>"},
                 "Question", {hasCorrect: false, randomOrder: false,
                              //if a question has a correct answer (hasCorrect: true), you would have to put
                              //that answer as the first element in the "as" option.
                              q: "How would you like to answer this question?",
                              as: ["https://github.com/anthonyyacovone/testing/blob/master/comb.png?raw=true", //this would be the correct answer if hasCorrect:true
                                   "Press 2 or click here for this answer.",
                                   "Press 3 or click here for this answer."]}],

    ["ready", "Message", {html: "<center><b>INTRODUCTIONS:</b> Listen to incrementally faster audio and recall information</center>", transfer: 'keypress'}],

    ["normal", "Message", {
      html: {
        include: 'sound_display.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'Please write the sentence you just heard?: <input type="text" name="inviteAnswer">'}],
    
    ["ready2", "Message", {html: "<center><b>Next:</b> Medium Speed</center>", transfer: 'keypress'}],

    ["medium", "Message", {
      html: {
        include: 'sound_display_med.html'
      },
      transfer: 'click'
    },
     "Form", {html: 'What was the last word that you heard?: <input type="text" name="okAnswer">'}],
    
    ["ready3", "Message", {html: "<center><b>Last:</b> Fastest Speed</center>", transfer: 'keypress'}],

    ["fast", "Message", {
      html: {
        include: 'sound_display_fast.html'
      },
      transfer: 'click'
    },
     "AcceptabilityJudgment", {s:"From a scale of 1 to 7, how easy was that to understand?",
                                           as:["1","2","3","4","5","6","7"],
                                            leftComment: "(Easy)",
                                            rightComment: "(Hard)"}],

    
    ["start", "Message", {html: "<center><b>EXAMPLE 1:</b> Listen and then Act Out with Drag N' Drop</center>", transfer: 'keypress'}],
    
     //Multiple choice question with image options
     ["drag", "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'keypress'},
      "PictureAccept_AY", {s: "Drag the objects to act out the sentence! Then CLICK what you USED to move forward!",
                            //specify to press key "A" for image 1 in the as list, etc...
                            as: [["A","https://github.com/anthonyyacovone/testing/blob/master/comb.png?raw=true"],
                                 ["B","https://github.com/anthonyyacovone/testing/blob/master/horse_comb.png?raw=true"],
                                 ["C","https://github.com/anthonyyacovone/testing/blob/master/hand.png?raw=true"],
                                 ["D","https://github.com/anthonyyacovone/testing/blob/master/horse1.png?raw=true"]]}],

    /*
    ===================
    SOUND
    Audio samples with and without questions
    ===================
    */


    //Type 1 audio, this is for when you don't want participants
    //to contol when to pause, this is just when the participant is ready,
    //they click and the audio plays without any interruption.
    //So in essential, you want to force participant to hear the entire audio
    //the audio file must be in chunk_includes
    //["q2", "AcceptabilityJudgment", {
     //  s: {
    //   audio: "../chunk_includes/meg.wav"
    //}},
     //Just to check if participant can hear audio or No
    //"Question", {
   //   q: 'Did you hear anything?'
    //}],

    //Type 2 audio, autoplay, press a button to continue at any time
    //participant can pause/play as many times as possible

    ["next", "Message", {html: "<center><b>EXAMPLE 2:</b> Listen and then provide the PP Object <br>(with or without modification)</center>", transfer: 'keypress'}],


    ["answer1", "Message", {
      html: {
        include: 'sound_nodisplay.html'
      },
      transfer: 'keypress'
    },
     "Form", {html: 'What can you brush?: <input type="text" name="brushAnswer">'}],
    

    //word by word text with fill in the blank question
    ["story", "DashedSentence", {s: "Remember the story?"},
     "Form", {html: 'Which player won the race: <input type="text" name="winningPlayer">'}],

    
    ["answer2", "Message", {
      html: {
        include: 'sound_nodisplay2.html'
      },
      transfer: 'keypress'
    },
     "Form", {html: 'What can you find?: <input type="text" name="findAnswer">'}],
    

    //word by word text with fill in the blank question
    //["story", "DashedSentence", {s: "Remember the story?"},
    // "Form", {html: 'Which player won the race: <input type="text" name="winningPlayer">'}],


    /*
    ===================
    VIDEO
    Video samples with options
    ===================
    */

    //Video type 1, display everything and keypress to continue
    //participant can loop over as many times as they want
    //transfer over to question with keypress
    //the html file must be in chunk_includes
    //["q2", "Message", {
     // html: {
    //    include: "video_display.html"
    //  },
    //  transfer: 'keypress'
    //}],

    //["q1", "Question", {
     // q: 'Did you see a bunny?'
    //}],

    //['q2', "Message", {
    //  html: "<p>In the next few slides, you will watch a video, and press any key to continue, you only get to watch it once. So make sure you are ready before continuing</p>",
    //  transfer: 'keypress'
    //}],

    //Video type 2, disable any sort of clicking to pause/play/mute video
    //useful for making sure participant actually listens or that
    //only one time listening experiments
    //if you want to make sure the participant watches the entire video, /
    //just set transer to duration of video in milliseconds (look at comments in video_nodisplay.html)
   // ["q2", "Message", {
     // html: {
     //   include: "video_nodisplay.html"
     // },
     // transfer: 'keypress'
    //}],

    //["q1", "Question", {
    //  q: 'Did you see anything?'
    //}],

    //Youtube example, 'disable' clicking, no 'real' way of getting around it
    //just a simple slick trick
    //["q2", "Message", {
    //  html: {
    //    include: "youtube.html"
    //  },
    //  transfer: 'keypress'
    //}],

    //["q1", "Question", {
    //  q: 'Did you see anything?'
    //}]




];



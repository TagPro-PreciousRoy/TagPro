TagPro
======
An example TagPro bot WebStorm Project to make a chrome '.user.js' and auto update the respective chrome extension. 

Features a build workflow for seperation of files with '@depends'(- a method to include javascript files) and automatic updating the extention in chrome.
Additionally support for other type of extentions by making a build/platform.extention.js and referencing it in "src/bot/build/make.js"

It merges all the files, on every change to one file: /TagProBot.user.js.
Then it minifies it to the extention directory of chrome.

Requirements:
  - WebStorm [http://www.jetbrains.com/webstorm]
  - Juicer [http://github.com/cjohansen/juicer]
    "Provides the @depends functionality, compiles scripts together."
  - UglifyJS [http://github.com/mishoo/UglifyJS]
    "A JavaScript minimizer(/obfusicator) which writes to the chrome extention directory."
  
  
Project structure:
  - src/bot/
    - build/ "Build files."
      - make.js "Make file denotes which platform.extention.js to use."
      - chrome.userScript.js "Chrome user.js include." (Currently holds author/version/etc info to be editted.
                                                        It also holds the method to load the bot into the tagpro game.)
        
    - lib/ "your custom library files."
    - CustomBot.js "bot"
    - main.js "Set version and which bot to use in your final compilation."
  - TagProBot.user.js "Merged result of build process."
  
  
 Usage:
   Edit your file and reload extension in chrome (I advise: https://github.com/Rob--W/Chrome-Extension-Reloader which adds a shortcut and a button next to greasemonkey to reload extentions.)


 Setup (Close WebStorm):
  - Change build/make.js and create a build/platform.extention.js if you want something else then a chrome .user.js.
  - Change main.js to update your VERSION and the BOT to use.
  - Change CustomBot.js to make a bot.
  
   "WebStorm project file: "TagPro/.idea/watcherTasks.xml" provides the arguments for setting up Juicer and UglifyJS."
  
   Chrome: 
    goto chrome://extensions/, check-[X] Developer Mode, 
                               click Load unpacked extension...
    Drag the empty TagProBot.user.js into the window to install.
    Locate the file on your System(, linux example provided.) Put that "URI+File" and replace with the value in the Uglifyjs arguments option.

   WebStorm:
     "TagPro/.idea/watcherTasks.xml"
      - Juicer bin PATH: <option name="program" value="$PROJECT_DIR$/../../.gem/ruby/2.1.0/bin/juicer" />
      - Uglifyjs bin PATH: <option name="program" value="/usr/bin/uglifyjs" />
        -  <option name="arguments" value="TagProBot.user.js --comments all --screw-ie8 true -o /home/xorc/.config/chromium/Default/Extensions/bkicbikhncibkncmhbkgnghlmkenihfp/1.0_0/script.js" /> 
   
 Behaviour:
   Currently it merges files as following:
   1. It builds 'build/make.js'. (@depend ../main.js, @depend chrome.userScript.js)
      a) make.js references which platform.extention.js to use for building a extention. 
        Currently it loads chrome.userScript.js which adds the neccessary information to make a user.js script in chrome.
        (Note: ATM all the settings have to be changed in this file regarding the user.js @'docblock' comments.
      b) Loads the contents of main.js.
        
    2. main.js has a reference to which bot to load. and holds a VERSION variable. (@depend CustomBot.js)
    
    3. CustomBot.js whatever you want.

    4. Merges it all into one file named: /TagProBot.user.js
    
    5. Minifies TagProBot.user.js into the chrome extension script.js in it's chrome extension directory.



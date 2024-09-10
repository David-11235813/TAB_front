# TAB_front
 TAB project front-end


##### DOESN'T WORK -Enabling access to local files (needed for including API)

 (optional, fail-safe but not really necessary) close all Chrome windows
 run ```"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --user-data-dir="C:/Chrome dev session" --disable-web-security --ignore-certificate-errors```
 open ```index.html``` file in opened Chrome window


 ## Deploying steps:

1) run the backend server
2) open index.html in VS Code, install "Live Server" extension by Ritwick Dey, change settings to localhost with port 3001, click 'Go Live' in the bottom right corner - couldn't make it work otherwise
3) in the web browser login: F12, error in console about security -> click and accept in the exclamation point website.
4) now it should finally work.
const signInPage = browser.page.signInPage();


describe('Login FE testing', ()=> {
    const data = browser.globals;
    before((browser)=>{
        console.log("Starting the SignIn Test Suite....");
        browser
        .window.maximize()
        .window.setSize(1920,1000);
        signInPage.navigate();
        console.log("Running Sign in Test");
    });

    it('LB-1132 : Verify "Go1Percent" logo, carousel images, carousel caption and the footer message (TC-337) ',function(browser){
        signInPage
        .assert.visible("@goLogo","Checking for Go Logo to be present")
        .assert.visible('@onePercentLogo',"Checking for One Percent Logo to be present")
        .assert.visible('@crouselImage',"Checking the crousel image")
        .assert.visible('@crouselCaption',"Checking the crousel Caption")
        .assert.visible('@footer',"Checking Footer message Visible");
    });
    it('LB-1133 : Verify that tag line with text "Get 1% Better Everyday" is displayed (TC-338)',function(browser){
        signInPage
        .assert.textEquals('@getOnePercentTagLine','Get 1% Better Everyday')
        .assert.visible('@getOnePercentTagLine');
    });
    it('LB-1134 : Verify that carousel image changes while clicking on carousel button (TC-339)',function(browser){
        // signInPage.assert.to.be.visible
        
    });
    it('LB-1136 : Verify that specific text between login options is present on the web page (TC-341)',function(browser){
        signInPage
        .assert.visible("@textBetweenLogInOption")
        .assert.textEquals("@textBetweenLogInOption","or do it via E-mail")
        // Validating text is present between both the logIn Options
        .getLocation('#kc-social-providers ul', function(result1) {
            browser.getLocation('#kc-social-providers h4', function(result2) {
              browser.getLocation('#kc-form-login', function(result3) {
                this.assert.ok(result1.value.y < result2.value.y && result2.value.y < result3.value.y, 'Element 2 is between Element 1 and Element 3');
              });
            });
          })    
        
    });
    it(' LB-1135 : Verify that login page heading contains text "Sign in to Go 1%" is displayed (TC-340)',function(browser){
        signInPage
        .assert.textContains("@pageHeading","Sign in to Go 1%")
        .assert.visible("@pageHeading");
    });
    it('LB-1137 : Verify that clicking on the Microsoft logo redirects to the Microsoft login page (TC-342)',function(browser){
        signInPage
        .clickMicrosoftButton()
        browser
        .assert.urlContains("https://login.microsoftonline.com/")
        .back();
    });
    it('LB-1138 : Verify that login fails with invalid credentials and an alert message is displayed (TC-343)',function(browser){
        signInPage
        .navigate()
        .setEmailValue("@userNameInputBox",data.signInData.email)
        .setPasswordValue(data.signInData.invalidPassword)
        .clickSignInButton();
        signInPage
        .assert.visible("@errorMessage")
        .assert.textContains("@errorMessage","Invalid username or password.");
    });
    
    it(' LB-1140 : Verify remember me checkbox is selected during login (TC-345)',function(browser){
        signInPage
        .clickRememberMeCheckbox()
          // Check if the checkbox is selected after clicking
        // browser.pause(5000)
        signInPage.isSelected('@rememberMeCheckbox', (result) => {
            browser.assert.equal(result.value, true, 'Checkbox is selected after clicking');
        })

    });
    it(' LB-1141 : Verify the forgot Password functionality (TC-346) ',function(browser){
        signInPage
        .clickForgotPassword()
        signInPage
        .assert.textContains('@pageHeading','Forgot Your Password?')
        signInPage
        .setEmailValue("@userNameInputBox",data.signInData.gmail)
        .clickSubmit()
        signInPage.assert.textEquals("@feedbackText","You should receive an email shortly with further instructions.")
        browser.back();
    });
    it('LB-1142 : Verify clicking on the "Terms of Use" link opens a new page with the terms of use (TC-347)',async function(browser){
        signInPage
        .clickTermsOfUse()
        browser.useXpath();
        browser.window.getAllHandles(function (result) {
            const originalWindow = result.value[0];
            // browser.pause(1000);
            const handle = result.value[1];
            this.window.switchTo(handle);
            browser.assert.textContains("//h5[contains(text(),'Terms of Use')]","Terms of Use");
            this.window.switchTo(originalWindow);
          });
        
    });
    it(' LB-1143 : Verify clicking on the "Privacy policy" link opens a new page with the privacy policy (TC-348) ',function(browser){
        signInPage
        .clickPrivacyPolicy()
        browser.useXpath()
        browser.window.getAllHandles(function (result) {
            const originalWindow = result.value[0];
            // browser.pause(1000);
            const handle = result.value[2];
            this.window.switchTo(handle);
            browser.assert.textContains("//h5[contains(text(),'Privacy Policy')]","Privacy Policy");
            this.window.switchTo(originalWindow);
          });

    });    
    it(' LB-1139 : Verify successful login with valid credentials (TC-344) ',function(browser){
        signInPage
        .setEmailValue("@userNameInputBox",data.signInData.email)
        .setPasswordValue(data.signInData.password)
        .clickSignInButton()
        signInPage.assert.titleEquals("NashTech QA |Go1%")
    }); 
    // Terminating the browser session after each test,to remove session cookix`es
    after ((browser)=>{
        browser.end();
    });

});

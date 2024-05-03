//const { page_objects_path } = require("../nightwatch.conf");
const { signInData } = require("../test-data/data");
const commands = [{
    setEmailValue(selector,email){
        // console.log(selector)
        return this
        .setValue(selector,email);
        
    },
    setPasswordValue(password){
        return this
        .setValue('@passwordInputBox',password);
    },
    validSignIn(){
        return this
        .setEmailValue("@userNameInputBox",signInData.email)
        .setPasswordValue(signInData.password)
        .clickSignInButton()
    },
    async clickSignInButton(){
        // Directly passed locator rather taking it from elements or test file because with custom commands this doesn't work
        await this
        .focusClick('css','#kc-login');
        return this;
    },
    async clickMicrosoftButton(){
        // Directly passed locator rather taking it from elements or test file because with custom commands this doesn't work
        await this
        .focusClick('css','#social-oidc')
        
        return this;
    },
    async clickRememberMeCheckbox(){
        // Directly passed locator rather taking it from elements or test file because with custom commands this doesn't work
        await this
        .focusClick('css','#rememberMe')
        return this
    },
    async clickForgotPassword(){
        await this
        .focusClick('css','.forget-pass a')
        return this
    },
    async clickSubmit(){
        await this
        .focusClick('css','#kc-form-buttons input')
        return this
    },
    async clickTermsOfUse(){
        await this
        .focusClick('xpath',"//div[@class='term-privacy']//a[contains(@href,'terms-of-use')]")
        return this
    },
    async clickPrivacyPolicy(){
        await this
        .focusClick('xpath',"//div[@class='term-privacy']//a[contains(@href,'privacy-policy')]")
        return this
    }

}];
const elements={
    // Elements are arranged in alphabetical order for fast searching
    userNameInputBox:"#username",
    passwordInputBox:"#password",
    signInButton:"#kc-login",
    errorMessage:"#input-error",
    goLogo : ".go1up-logo",
    onePercentLogo :".onepercenet-logo",
    crouselImage :".item.active",
    crouselCaption :".item.active h3",
    footer: ".tagsss",
    getOnePercentTagLine : ".item.active .carousel-caption h3",
    pageHeading : "#kc-page-title",
    microsoftButton : "#social-oidc",
    textBetweenLogInOption: "#kc-social-providers h4",
    rememberMeCheckbox:"#rememberMe",
    forgotPassword:".forget-pass a",
    submitButton:"#kc-form-buttons input",
    feedbackText:".kc-feedback-text",
    termsOfUse:"//div[@class='term-privacy']//a[contains(@href,'terms-of-use')]",
    privacyPolicy:"//div[@class='term-privacy']//a[contains(@href,'privacy-policy')]",
    termsOfUseTitle:"//h5[contains(text(),'Terms of Use')]",
    privacyPolicyTitle:"//h5[contains(text(),'Privacy Policy')]"
    
};
const url = "https://nashtechglobal.qa.go1percent.com/";

const signIn={
    url:url,
    elements:elements,
    commands:commands
};
module.exports= signIn;



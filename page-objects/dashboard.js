const commands = [{
    clickProfilePicture: function () {
      return this.click("@profilePicture");
    },
    searchNasher: function (name) {
      return this.setValue("@searchBar", name);
    },
    hoverOverLanguageBar: function (browser) {
      dashboard.HoverOverLanguageBar();
      browser.click("@frenchLanguage");
    },
    clickLikeButton: function (browser) {
      browser.click("@likeButton");
    },
    enterComment: function (browser) {
      return this.click("@comment");
    }
  }]
const elements = {
    username: "#username",
    password: "#password",
    signInButton: "#kc-login",
    welcomeMessage: ".font-weight-light.overall-txt-color",
    profilePicture: ".material-symbols-outlined.hex",
    searchBar: "#Search",
    searchNameResult: ".search-names",
    selectLanguage: ".dropdown-select:nth-child(1)",
    frenchLanguage: 'div[class="dropdown-list"] div:nth-child(2)',
    lastContribution: ".card.col-lg-5.overall-card-height-new:nth-child(2)",
    motivationTileContributions: ".card.page-wrapper",
    likeButton: 'div[class="my-dashboard mt-n4"] div:nth-child(1) div:nth-child(1) div:nth-child(2) a:nth-child(1) span:nth-child(1)',
    seeAll: ".btn.px-3.py-1.all-btn.border-button",
    comment: 'div[class="my-dashboard mt-n4"] div:nth-child(1) div:nth-child(1) div:nth-child(2) a:nth-child(3) span:nth-child(2)',
}
const url = "https://nashtechglobal.qa.go1percent.com/";
const dashboard = {
    url: url,
    elements: elements,
    commands: commands
}
module.exports =  dashboard;

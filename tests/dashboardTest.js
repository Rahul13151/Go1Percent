const dashboard = browser.page.dashboard();
const signInPage = browser.page.signInPage();
const { signInData } = require("../test-data/data");

describe('Login FE testing', ()=> {
    before((browser)=>{
        console.log("Starting the SignIn Test Suite....");
        browser
        .window.maximize()
        .window.setSize(1920,1000);
        dashboard.navigate();
        signInPage.validSignIn();
        console.log("Running Sign in Test");


    });
    it('LB-816 : Verify user should be able to see Welcome text (TC-64) ',()=>{
        var userName = signInData.email;
        var capitalizeUserName = userName[0].toUpperCase()+ userName.slice(1);
        dashboard
        .assert.textEquals("#navbarBlur h4 span","Welcome,")
        .assert.textEquals("#navbarBlur h4 span:nth-child(2)",capitalizeUserName)
    });

    it('LB-814 : Verify user should be able to see all fields in dashboard page (TC-63)',()=>{
        browser
        .waitForElementVisible("#sidenav-collapse-main .navbar-nav", 5000)
        .assert.visible(
            "#sidenav-collapse-main .navbar-nav",
            "Left field is Present in the Dashboard Webpage",
        )
        .assert.visible(
            ".mt-3.mb-4.card-heading.d-flex.align-items-center.justify-content-center.fs-4",
            "Your Reward field is present",
        )
        .assert.visible(
            ".mt-3.mb-4.d-flex.align-items-center.justify-content-center",
            "Last Contribution is present",
        )
        .assert.visible(
            ".d-flex.row",
            "Points, Overall Score, Overall Rank field is present",
        )
        .assert.visible(
            ".card.card-heading.me-2.pb-5",
            "Daily Motivation is Present",
        )
        .assert.visible(
            ".ms-3.text-white.mt-4.mb-n4",
            "12 Months Contribution is Present",
        );
    });

    it("LB-818 : Verify user should be able to navigate profile page through Profile picture (TC-65)", async ()=> {
        await browser.waitForElementVisible(".material-symbols-outlined.hex", 5000);
        await browser.execute(
          'document.querySelector(".material-symbols-outlined.hex").click();'
        );
        browser.assert.urlContains("my-profile");
      });
    
      it("LB-822 : Verify user should be able Search a Nasher (TC-69)", (browser)=> {
        dashboard.searchNasher("Rahul Kumar");
        browser.waitForElementVisible(".text-color.name-text");
        browser.execute(
          'document.querySelector(".material-symbols-outlined.cursor-pointer.me-3.person-icon").click();'
        );
        browser.back();
      });
    
      it("LB-823 : Verify user should be able to Change to French Language from dropdown (TC-70)", async (browser)=> {
        await browser.waitForElementVisible(".dropdown-select:nth-child(1)", 5000);
        await browser.execute(
          'document.querySelector(".dropdown-select:nth-child(1)").click();'
        );
        dashboard.expect.element(".badge-text.text-bolder").to.be.visible;
      });
    
      it("LB-824 : Verify user should be able to Change to English Language from dropdown (TC-71)", async (browser)=> {
        await browser.waitForElementVisible(".dropdown-select:nth-child(1)", 5000);
        await browser.execute(
          "document.querySelector(\"div[class='dropdown-list'] div:nth-child(1)\").click();"
        );
        dashboard.expect.element(".badge-text.text-bolder").to.be.visible;
      });
    
      it("LB-825 : Verify user should be able to Change Application view to Light Mode (TC-72) ", async (browser)=> {
        await browser.waitForElementVisible(
          'ul[class="navbar-nav justify-content-end"] i[class="material-icons user-icon cursor-pointer"]',
          5000
        );
        await browser.execute(
          "document.querySelector(\"ul[class='navbar-nav justify-content-end'] i[class='material-icons user-icon cursor-pointer']\").click();"
        );
        dashboard.assert
          .element(
            "ul[class='navbar-nav justify-content-end'] i[class='material-icons user-icon cursor-pointer']"
          )
          .text.to.contain("dark_mode");
      });
    
      it("LB-826 : Verify user should be able to Change Application view to Dark Mode (TC-73) ", async (browser)=> {
        await browser.waitForElementVisible(
          'ul[class="navbar-nav justify-content-end"] i[class="material-icons user-icon cursor-pointer"]',
          5000
        );
        await browser.execute(
          "document.querySelector(\"ul[class='navbar-nav justify-content-end'] i[class='material-icons user-icon cursor-pointer']\").click();"
        );
        dashboard.assert
          .element(
            "ul[class='navbar-nav justify-content-end'] i[class='material-icons user-icon cursor-pointer']"
          )
          .text.to.contain("light_mode");
        browser.back();
      });
    
      it("LB-827 : Verify user should be able to see Last Contribution (TC-74)", (browser)=> {
        dashboard.waitForElementPresent(
          ".card.col-lg-5.overall-card-height-new:nth-child(2)",
          5000
        );
        dashboard.assert.element(
          ".card.col-lg-5.overall-card-height-new:nth-child(2)"
        ).to.be.visible;
      });
    
      it("LB-828 : Verify user should be able to see Contribution on Motivation tile (TC-75)", (browser)=> {
        dashboard.waitForElementVisible("@MotivationTileContributions", 1000);
        dashboard.assert.element("@MotivationTileContributions").to.be.visible;
        
      });
    
      it("LB-833 : Verify user should be able to click see all button for Daily motivation tile (TC-80)", async (browser)=> {
        dashboard.waitForElementVisible(
          ".btn.px-3.py-1.all-btn.border-button",
          5000
        ).execute(()=> {
          document.querySelector(".btn.px-3.py-1.all-btn.border-button").click();
        });
        dashboard.assert.element(".my-dashboard.mt-n4").to.be.visible;
      });
    
      it("LB-829 : Verify user should be able to Like specific Contribution (TC-76) ", async (browser)=> {
        // await browser.execute('document.querySelector(".btn.px-3.py-1.all-btn.border-button").click();');  //Click on See All
        dashboard.execute(()=> {
          document.querySelector(".btn.px-3.py-1.all-btn.border-button").click();
        }),
          dashboard.waitForElementVisible(
            'div[class="my-dashboard mt-n4"] div:nth-child(1) div:nth-child(1) div:nth-child(2) a:nth-child(1) span:nth-child(1)',
            5000
          ).execute(()=> {
            document
              .querySelector(
                'div[class="my-dashboard mt-n4"] div:nth-child(1) div:nth-child(1) div:nth-child(2) a:nth-child(1) span:nth-child(1)'
              )
              .click();
          }),
          dashboard.assert
            .element(
              "div[class='my-dashboard mt-n4'] div:nth-child(1) div:nth-child(1) div:nth-child(2) a:nth-child(1) span:nth-child(2)"
            )
            .text.to.contain(1);
      });
    
      it(" LB-830 : Verify user should be able to Dislike specific Contribution (TC-77)", async (browser)=> {
        dashboard.waitForElementVisible(
          'div[class="my-dashboard mt-n4"] div:nth-child(1) div:nth-child(1) div:nth-child(2) a:nth-child(2) span:nth-child(1)',
          5000
        ).execute(()=> {
          document
            .querySelector(
              'div[class="my-dashboard mt-n4"] div:nth-child(1) div:nth-child(1) div:nth-child(2) a:nth-child(2) span:nth-child(1)'
            )
            .click();
        }),
          dashboard.assert
            .element(
              'div[class="my-dashboard mt-n4"] div:nth-child(1) div:nth-child(1) div:nth-child(2) a:nth-child(2) span:nth-child(2)'
            )
            .text.to.contain(1);
      });
    
      it("LB-831 : Verify user should be able to send a Comment on specific Contribution (TC-78)", async (browser)=> {
        await browser.waitForElementVisible(
          'div[class="my-dashboard mt-n4"] div:nth-child(1) div:nth-child(1) div:nth-child(2) a:nth-child(3) span:nth-child(2)',
          5000
        );
    
        await browser.execute(()=> {
          document
            .querySelector(
              'div[class="my-dashboard mt-n4"] div:nth-child(1) div:nth-child(1) div:nth-child(2) a:nth-child(3) span:nth-child(2)'
            )
            .click();
        });
    
        await browser.waitForElementVisible(
          ".form-control.p-2.ng-untouched.ng-pristine.ng-invalid",
          5000
        );
    
        await browser.execute(()=> {
          document
            .querySelector(".form-control.p-2.ng-untouched.ng-pristine.ng-invalid")
            .click();
        });
    
        browser.setValue('[formcontrolname="comment"]', [
          "Test Pass",
          browser.Keys.ENTER,
        ]);
        browser.pause(2000);
    
        dashboard.assert.element(".p-4.comment-box").text.to.contain("Test Pass");
      });
    
      it("LB-832 : Verify use should be able to Share specific Contribution on social media (TC-79)", async (browser)=> {
        let firstWindowHandle;
    
        await browser.waitForElementVisible(
          "body > app-root:nth-child(1) > div:nth-child(1) > app-main:nth-child(2) > section:nth-child(1) > main:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > app-my-dashboard:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > app-my-feeds:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(4) > button:nth-child(1)",
          5000
        );
    
        await browser.execute(()=> {
          document
            .querySelector(
              "body > app-root:nth-child(1) > div:nth-child(1) > app-main:nth-child(2) > section:nth-child(1) > main:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > app-my-dashboard:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > app-my-feeds:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(4) > button:nth-child(1)"
            )
            .click();
        });
    
        await browser.window.getAllHandles(function (result) {
          const handles = result.value;
          firstWindowHandle = handles[0]; // Storing the handle of the first window
        });
    
        await browser.waitForElementVisible(
          ".sb-wrapper.sb-show-icon.sb-linkedin",
          5000
        );
    
        await browser.execute(()=> {
          document.querySelector(".sb-wrapper.sb-show-icon.sb-linkedin").click();
        });
    
        await browser.window.getAllHandles(function (result) {
          const handles = result.value;
          const newWindowHandle = handles[handles.length - 1]; // Getting the handle of the new window
          browser.window.switch(newWindowHandle); // Switching to the new window
        });
    
        dashboard.assert.url().to.contain("linkedin.com");
    
        await browser.window.switch(firstWindowHandle);
      });
    
      it(" LB-834 : Verify user should be able to navigate Profile page through Settings button (TC-81)", async (browser)=> {
        await browser.waitForElementVisible(
          'ul[class="navbar-nav justify-content-end"] app-dropdown-wrapper div[class="position-relative"] div[class="pt-2"] li[class="icon nav-item dropdown px-2 d-flex align-items-center justify-content-center"] a[class="nav-link text-body p-0 text-white"] div i[class="material-icons user-icon"] ',
          10000
        );
    
        await browser.execute(()=> {
          document
            .querySelector(
              'ul[class="navbar-nav justify-content-end"] app-dropdown-wrapper div[class="position-relative"] div[class="pt-2"] li[class="icon nav-item dropdown px-2 d-flex align-items-center justify-content-center"] a[class="nav-link text-body p-0 text-white"] div i[class="material-icons user-icon"]'
            )
            .click();
        });
        // browser.pause();
    
        await browser.waitForElementVisible(
          'div[class="d-flex py-1 mt-1"] span',
          5000
        );
        await browser.execute(()=> {
          document.querySelector('div[class="d-flex py-1 mt-1"] span').click();
        });
        dashboard.assert.url().to.contain("my-profile");
      });
    
      it("LB-1286 : Verify user should be able to click on points and redirect to profile page ", async (browser)=> {
        browser.back();
        await browser.waitForElementVisible(
          "body > app-root:nth-child(1) > div:nth-child(1) > app-main:nth-child(2) > section:nth-child(1) > main:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > app-my-dashboard:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > app-overall-my-contributions:nth-child(1) > div:nth-child(1) > div:nth-child(2)",
          5000
        );
    
        await browser.execute(()=> {
          document
            .querySelector(
              "body > app-root:nth-child(1) > div:nth-child(1) > app-main:nth-child(2) > section:nth-child(1) > main:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > app-my-dashboard:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > app-overall-my-contributions:nth-child(1) > div:nth-child(1) > div:nth-child(2)"
            )
            .click();
          // browser.pause();
        });
        dashboard.assert.url().to.contain("my-profile");
      });
    
      it(" LB-1287 : Verify user should be able to click on Overall ranks and redirect to profile page.", async (browser)=> {
        browser.back();
        await browser.waitForElementVisible(
          "body > app-root:nth-child(1) > div:nth-child(1) > app-main:nth-child(2) > section:nth-child(1) > main:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > app-my-dashboard:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > app-overall-my-contributions:nth-child(1) > div:nth-child(1) > div:nth-child(3)",
          5000
        );
    
        await browser.execute(()=> {
          document
            .querySelector(
              "body > app-root:nth-child(1) > div:nth-child(1) > app-main:nth-child(2) > section:nth-child(1) > main:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > app-my-dashboard:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > app-overall-my-contributions:nth-child(1) > div:nth-child(1) > div:nth-child(3)"
            )
            .click();
        });
        dashboard.assert.url().to.contain("my-profile");
      });
    
      it("LB-1288 : Verify user should be able to click on Overall score and redirect to profile page. ", async (browser)=> {
        browser.back();
        await browser.waitForElementVisible(
          'div[class="card cursor-pointer py-4"] div:nth-child(4)',
          5000
        );
        await browser.execute(()=> {
          document
            .querySelector('div[class="card cursor-pointer py-4"] div:nth-child(4)')
            .click();
        });
        dashboard.assert.url().to.contain("my-profile");
      });
    
      it("LB-836 : Verify user should be able to Logout through Settings button (TC-83) ", async ()=> {
        await browser.waitForElementVisible(
          'ul[class="navbar-nav justify-content-end"] app-dropdown-wrapper div[class="position-relative"] div[class="pt-2"] li[class="icon nav-item dropdown px-2 d-flex align-items-center justify-content-center"] a[class="nav-link text-body p-0 text-white"] div i[class="material-icons user-icon',
          5000
        );
    
        await browser.execute(()=> {
          document
            .querySelector(
              'ul[class="navbar-nav justify-content-end"] app-dropdown-wrapper div[class="position-relative"] div[class="pt-2"] li[class="icon nav-item dropdown px-2 d-flex align-items-center justify-content-center"] a[class="nav-link text-body p-0 text-white"] div i[class="material-icons user-icon'
            )
            .click();
        });
    
        await browser.waitForElementVisible('div[class="d-flex py-1"] span', 5000);
    
        await browser.execute(()=> {
          document.querySelector('div[class="d-flex py-1"] span').click();
        });
    
        dashboard.assert.url().to.contain("auth.go1percent.com");
        // browser.pause();
      });
});
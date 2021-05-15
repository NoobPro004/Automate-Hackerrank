const puppeteer = require("puppeteer");
let url="https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login";
let page;
let code;
let language;
async function fn(){
try{
    let browser=await puppeteer
    .launch({
      headless: false,
      defaultViewport: null,
      args: ["--start-maximized"],
      slowMo:50,
    });
    let pagearr=await browser.pages();
    page=pagearr[0];
    await page.goto(url);
    await page.type("#input-1", "hipamed353@dghetian.com",{delay : 100});
    await page.type("#input-2", "12345678",{delay : 100});
    await waitclicknav(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    await waitclicknav("[title='Interview Preparation Kit']");
    await waitclicknav("[data-attr1='warmup']");
    await page.waitForSelector(".js-track-click.challenge-list-item",{visible:true})
    let href=await page.evaluate(function(){
        let hrefarr=[];
        let allbtns=document.querySelectorAll(".js-track-click.challenge-list-item");
        for(let i=0;i<allbtns.length;i++){
            let hre=allbtns[i].getAttribute("href");
            hrefarr.push(hre);
        }

        return hrefarr;
    })

    for(let i=0;i<href.length;i++){
        let link="https://www.hackerrank.com"+href[i];
        await submitcode(link);
    }

}catch(err){
    console.log(err);
}

}
async function submitcode(link){
    await page.goto(link);
    await page.waitForSelector("[data-attr2='Editorial']",{visible : true});
    await page.click("[data-attr2='Editorial']");
    try{
        await handleLockBtn();
    }catch(err){
        console.log(err);
    }
    await page.waitForSelector("challenge-editorial-block.editorial-setter-code pre",{visible:true})
    code =await page.evaluate(function () { 
        return document.querySelector(".challenge-editorial-block.editorial-setter-code pre").innerText;
}) 
await await page.waitForSelector(".challenge-editorial-block.editorial-setter-code h3",{visible:true});
language=await page.evaluate(function () {
        return document.querySelector(".challenge-editorial-block.editorial-setter-code h3").innerText;
      });
      await page.waitForSelector("[data-attr2='Problem']",{visible:true});
      await page.click("[data-attr2='Problem']");
      await pastecode();
}
async function pastecode() {
    
      try{
        await page.waitForSelector("[type='checkbox']",{visible:true})
        await page.click("[type='checkbox']");
        await page.waitForSelector("#input-1");
        await page.type("#input-1", code);
        await page.keyboard.down("Control");
        await page.keyboard.press("A");
        await page.keyboard.press("X");
        await page.keyboard.up("Control");
        await page.click(".css-1hwfws3");
        await page.type(".css-1hwfws3", language);
        await page.keyboard.press("Enter");
        await page.click(".monaco-editor.no-user-select.vs",{delay:100});
        await page.keyboard.down("Control");
        await page.keyboard.press("A");
        await page.keyboard.press("V");
        await page.keyboard.up("Control");
        await page.click(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled");
      }catch(err){
          console.log(err);
      }
  }
async function handleLockBtn() {
     try{
        await  page.waitForSelector(".editorial-content-locked .ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled",{visible:true,timeout:5000})
        await page.evaluate(function(){
            document.querySelector(".ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled").click();
        })
     }catch(err){
         console.log(err);
     }
  }

async function waitclicknav(selector) {
     try{
        await page.waitForSelector(selector, { visible: true,timeout : 5000 });
        await Promise.all([page.click(selector), page.waitForNavigation()]);
     }catch(err){
         console.log(err);
     }
  }

  fn();
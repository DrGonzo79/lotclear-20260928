import {test,expect} from "@playwright/test";

test("audits a packet, resolves the blocker and copies the clerk checklist",async({page})=>{
  await page.goto("/");
  await page.getByRole("button",{name:"Run packet audit"}).click();
  await expect(page.getByText("Hold before submission")).toBeVisible();
  await expect(page.getByText("Odometer disclosure",{exact:true}).last()).toBeVisible();
  await page.getByText("Odometer disclosure",{exact:true}).first().click();
  await page.getByRole("button",{name:"Run packet audit"}).click();
  await expect(page.getByText("Ready for human review")).toBeVisible();
  await page.getByRole("button",{name:"Copy clerk checklist"}).click();
  await expect(page.getByRole("button",{name:"Checklist copied"})).toBeVisible();
});

test("opens state requirements and changes the selected deal",async({page})=>{
  await page.goto("/");
  await page.getByRole("button",{name:/View Florida rule/}).click();
  await expect(page.getByRole("dialog",{name:"State rule detail"})).toBeVisible();
  await page.getByRole("button",{name:"Close state rule"}).click();
  await page.getByLabel("Deal",{exact:true}).selectOption("D-2024");
  await page.getByRole("button",{name:"Run packet audit"}).click();
  await expect(page.getByText("100% complete")).toBeVisible();
});

test("shows validation and mobile has no page overflow",async({page,isMobile})=>{
  await page.goto("/");
  await page.getByText("Assigned title",{exact:true}).click();
  await page.getByText("Bill of sale",{exact:true}).click();
  await page.getByText("Insurance proof",{exact:true}).click();
  await page.getByRole("button",{name:"Run packet audit"}).click();
  await expect(page.locator("p.error")).toContainText("at least one document");
  if(isMobile){const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth);expect(overflow).toBe(false)}
});

const puppeteer = require("puppeteer");
const email = "sid370578@gmail.com"
const password = "Ss@665432"
const codeObj = require("./code");

let global_tab; // to keep info of TAB we'll work on,
// acc. to node naming convetion TABs are opften referred as PAGEs
let page

// Launched Browser
let browserPromise = puppeteer.launch({
	headless: false, // ":false" s Automation hote hue dikhta hai
	defaultViewport: null,
	args: ["--start-maximized", "--incognito"], // "--start.." -> max Window Size, "--icog..." -> Automates in icog. mode
});


browserPromise
	//newpage open
	.then(function (browserObj) {
		let newTab_Promise = browserObj.newPage();
		return newTab_Promise;
	}).then(function (newTab) {
		page = newTab;

		let hackerRankOpenedPromise = page.goto(
			"https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login" //navigate to login page
		);
		return hackerRankOpenedPromise;
	}).then(function () {
		let emailWillBeTyped = page.type("input[type=Text]", email, {
			delay: 50,
		});
		return emailWillBeTyped;
	})
	.then(function () {

		let passwordWillBeType_Promise = page.type("input[type='password']", password, {
			delay: 50,
		});
		return passwordWillBeType_Promise;
	}).then(function () {

		let loginButtonWillBeClicked_Promise = page.click(
			"button.c-cUYkx.c-cUYkx-dshqME-variant-primary.c-cUYkx-fGHEql-isFullWidth-true.c-cUYkx-ABeol-size-large"
		);
		return loginButtonWillBeClicked_Promise;
	}).then(function () {

		let interviewKitclick_Promise = waitAndClick(
			".topic-card a[data-attr1=algorithms]", page

		);
		return interviewKitclick_Promise;
	}).then(function () {
		let waitfor3sec = page.waitFor(3000);
		return waitfor3sec
	}).then(function () {
		let allChallengePromise = page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled", { delay: 50 });
		console.log("siddiq shaikh", allChallengePromise);
		return allChallengePromise;
	})
	.then(function (questionsArr) {
		console.log("All challenges retrieved", questionsArr.length);
		let questionWillBeSolved = questionSolver(page, questionsArr[0], codeObj.answers[0])
		return questionWillBeSolved
	})







function waitAndClick(selector, cpage) {
	return new Promise(function (resolve, reject) {
		let selectorWaitPromise = cpage.waitForSelector(selector, {
			visible: true,
		}); // wait selector to load
		selectorWaitPromise.then(function () {
			let selectorClickPromise = cpage.click(selector); // click
			selectorClickPromise
				.then(function () {
					resolve();
				})
				.catch(function (err) {
					reject(err);
				});
		});
	});
}


function questionSolver(page, question, answers) {
	return new Promise(function (resolve, reject) {
		let questionWillBeClicked = question.click()
		console.log("quesstion  click")
		questionWillBeClicked.then(function () {
			let editorInFocusPromise = waitAndClick('.monaco-editor.no-user-select.vs', page);
			return editorInFocusPromise
		}

		)

			.then(function () {
				console.log("checkbox button")
				return waitAndClick('.checkbox-input', page)
			}).then(function () {
				console.log("textarea button")

				return page.waitForSelector('textarea.custominput', page)
			}).then(function () {
				console.log("textarea button")

				return page.type('textarea.custominput', answers, {delay:50})
			})
			.then(function () {
				let ctrlIsPressed = page.keyboard.down('Control')
				console.log("control button")

				return ctrlIsPressed
			}).then(function () {
				let AisPressed = page.keyboard.press('A', { delay: 50 })
				console.log("A button")

				return AisPressed
			})
			.then(function () {
				let XisPressed = page.keyboard.press('X', { delay: 50 })
				console.log("X button")


				return XisPressed
			})
			.then(function () {
				let mainEditorInFocus = waitAndClick('.monaco-editor.no-user-select.vs', page)
				console.log("MOMVCOO button")

				return mainEditorInFocus
			}).then(function () {
				let ctrlIsPressed = page.keyboard.down('Control')
				console.log("CONTRIL button")

				return ctrlIsPressed
			}).then(function () {
				let AisPressed = page.keyboard.press('A', { delay: 50 })
				return AisPressed
			}).then(function () {
				let VisPressed = page.keyboard.press('V', { delay: 50 })
				console.log("V button")

				return VisPressed
			})
			.then(function () {
				let ctrlIsPressed = page.keyboard.down('Control')
				return ctrlIsPressed
			}).then(function () {
				console.log("START MONO RUN button")

				return page.click('.hr-monaco__run-code', { delay: 50 })
			})
	})


}
# Assessment Guide: Git workflow, heuristic evaluation, WAVE test

## 1. GitHub workflow (you are marked on regular commits over time)

One-time setup:
```
cd profile-site
git init
git branch -M main
git add README.md
git commit -m "Initial commit: add README"
# Create an EMPTY repo on github.com first (no README), then:
git remote add origin https://github.com/<your-username>/profile-site.git
git push -u origin main
```

Then commit small and often, on different days. Suggested sequence:
1. `Add site structure and shared CSS design tokens`
2. `Add About page with placeholder image`
3. `Add Technical Interests page`
4. `Add Portfolio page with project cards`
5. `Add pop-up dialog JavaScript for portfolio`
6. `Add Project details page`
7. `Add Contact form with client-side validation`
8. `Fix: improve colour contrast after WAVE test`
9. `Add skip link and focus styles`
10. `Update README and add evaluation reports`

Tips:
- Use `git add <file>` then `git commit -m "..."`, then `git push`.
- Use a feature branch for bigger changes (`git checkout -b feature/contact-form`) and merge via a pull request.
- Optional: enable GitHub Pages (Settings > Pages > Deploy from branch `main`) to host the site.
- Record issues found in testing as GitHub Issues and close them with commits ("Fixes #3"). This shows development over time.
- Do not commit everything in one go the night before the deadline.

## 2. Heuristic evaluation (Nielsen's 10)

Use the template your module gives you. Do this alone: no other person may be involved. Go through each page and each heuristic, record problems, give a severity rating (0 to 4) and a fix.

Severity: 0 not a problem, 1 cosmetic, 2 minor, 3 major, 4 catastrophe.

Prompts per heuristic (examples relevant to this site):

| # | Heuristic | What to check on your site |
|---|-----------|----------------------------|
| 1 | Visibility of system status | Is the current page shown in the nav? Does the form confirm success or errors? |
| 2 | Match between system and real world | Plain language labels, familiar words, logical order of pages |
| 3 | User control and freedom | Can the dialog be closed (button, Esc, backdrop)? Clear form button? Back to portfolio link? |
| 4 | Consistency and standards | Same nav, buttons and layout on every page? Links look like links? |
| 5 | Error prevention | Required fields marked, email hint, format guidance |
| 6 | Recognition rather than recall | Visible nav on all pages, labels not placeholders |
| 7 | Flexibility and efficiency of use | Skip link, keyboard use, quick view vs full details |
| 8 | Aesthetic and minimalist design | Any clutter or redundant text? |
| 9 | Help users recognise, diagnose, recover from errors | Specific error messages, focus moved to first error |
| 10 | Help and documentation | Is there guidance where needed (form hints)? Is anything missing? |

Be honest: finding real issues and proposing fixes scores better than reporting none. Examples of genuine weaknesses you might find in this starter: no search, no "back to top", no confirmation before clearing the form, the project page is one generic holding page, and no real data is sent so the success message could mislead (it says demo only).

## 3. WAVE conformance test (WCAG 2.2 AA)

Rules: use ONLY the WAVE browser extension, and do not involve anyone else.

Steps:
1. Install the WAVE extension (https://wave.webaim.org/extension/) in Chrome, Edge or Firefox.
2. Open each of the five pages (serve locally or via GitHub Pages).
3. Click WAVE and record: number of Errors, Contrast Errors, Alerts, Features, Structural Elements, ARIA.
4. Take a screenshot of each page's summary and the details panel (put them in your template).
5. Fix every error and contrast error, re-test, and take "after" screenshots.
6. Run the test during development (an early "before" run) AND on the final site. The brief wants evidence you focused on accessibility during development, so keep early results.
7. Test the contact page in its error state too: submit the empty form, then run WAVE.
8. Review Alerts manually, explain any you accept (e.g. "redundant link" or "possible heading") and why they do not break AA.
9. Map your results to WCAG success criteria, e.g. 1.1.1 Non-text content, 1.4.3 Contrast (Minimum), 2.4.1 Bypass Blocks, 2.4.7 Focus Visible, 3.3.1 Error Identification, 3.3.2 Labels or Instructions, 4.1.2 Name, Role, Value.

Also note in your report what WAVE cannot check (e.g. meaningful alt text quality, keyboard operability, logical reading order). You must not use other tools for the conformance test itself, so only mention these as limitations.

## 4. Mapping to the learning outcomes (for your write-up)
- KU1: explain WCAG principles (POUR), Nielsen heuristics, and how your choices apply them.
- KU2: mention commercial context: legal duty under the Equality Act 2010, wider market, SEO benefits, cost of retrofitting versus building in.
- KU3: show accessibility embedded in the lifecycle: early WAVE runs, issues in GitHub, fix commits.
- IPT1: discuss legal, social, ethical and professional issues (Equality Act 2010, Public Sector Bodies Accessibility Regulations 2018, BCS Code of Conduct).
- IPT2: communicate problems and solutions clearly in your templates.

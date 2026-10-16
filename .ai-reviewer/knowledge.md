# fed-up reviewer notes

## Architecture

This repository contains the `care-for-kids` responsive informational website, implemented as static HTML/CSS and served directly from `dist/index.html` without installation (`care-for-kids/README.md`). Project guidance is organized under `care-for-kids/docs/`, covering structure, page sections, styling, content, accessibility, assets, and manual checks. The repository also contains language-specific conversion examples and deliberately invalid samples under `care-for-kids/error-fixtures/`, plus a standalone Node.js helper in `care-for-kids/broken-fetch.js`.

## Conventions

- The website is deployment-oriented static content: changes should preserve the ability to open `care-for-kids/dist/index.html` directly in a browser (`care-for-kids/README.md`).
- Documentation is split by concern rather than collected in one large guide; follow the linked topics in `care-for-kids/docs/README.md`.
- Conversion functions use explicit `{source}_to_{target}` snake_case names in Python, e.g. `kilometers_to_meters` (`care-for-kids/error-fixtures/broken_01.py`), and camelCase names in JavaScript/TypeScript, e.g. `kilometersToMeters` (`broken_06.js`, `broken_11.ts`).
- Conversion functions accept fractional numeric values, preserve sign, and use direct multiplication or division by a fixed conversion factor. This contract is stated repeatedly in their docstrings/JSDoc, for example in `broken_03.py` and `broken_08.js`.
- Python conversion functions are type-annotated with `float` and generally assign the calculation to `result` before returning it (`broken_01.py`). TypeScript equivalents annotate both parameter and return types as `number` (`broken_11.ts`).
- JavaScript fixture modules use named ES exports (`broken_06.js`); `broken-fetch.js` is instead a CommonJS executable/module using `require`, `module.exports`, and a `require.main` CLI guard.
- Unit labels distinguish decimal storage units (1000-based) from binary units (`kibibytes`, `mebibytes`, etc., 1024-based) in `broken_05.py` and `broken_10.js`.

## Intentional non-standard choices

- Files in `care-for-kids/error-fixtures/` are deliberately broken fixtures. Syntax errors such as `def sample_1()` without a colon (`broken_01.py`) and malformed expressions such as `return (7 + 1;` (`broken_07.js`) should not be “fixed” unless the change specifically targets the fixture.
- The repetitive one-function-per-conversion style and intermediate `result` variables are intentional fixture conventions, not candidates for abstraction by default.
- `broken-fetch.js` intentionally calls `https://example.com/users` and is runnable as a small CLI helper; do not assume it is the website’s production data layer.

## Watch out for

- Flag syntax or type errors introduced outside the explicitly invalid `error-fixtures` directory.
- Verify conversion factors and direction carefully; reciprocal functions must divide by the same factor used by the forward conversion.
- Flag accidental changes to decimal versus binary storage semantics, especially mixing 1000 and 1024 factors (`broken_05.py`, `broken_10.js`).
- In `broken-fetch.js`, preserve response-status checking before parsing JSON and ensure failures remain observable through the existing `.catch()` path.
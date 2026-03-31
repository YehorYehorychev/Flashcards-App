---
name: code-comments-and-best-practices
description: Guides strategic inline and block comments for maintainability plus consistent application of common engineering practices. Use when implementing features, refactoring, reviewing code, or when the user asks for clearer documentation in code or for “best practices.”
---

# Code comments and best practices

## When to add comments

Add or keep comments where the code alone does not carry enough intent:

- **Why, not what**: Decisions, tradeoffs, rejected alternatives, and constraints (performance, API limits, platform quirks).
- **Non-obvious behavior**: Order-dependent logic, subtle invariants, edge cases, and anything a future reader could misread.
- **Public contracts**: Exported functions, types, and modules—document parameters, return values, errors, and preconditions where the type system does not express them.
- **Complex flows**: Short section headers or one-line pointers before dense blocks (e.g. state machine steps, multi-step pipelines).
- **External references**: Specs, tickets, or standards that justify non-intuitive code (use stable links or IDs, not transient chat).

Match the project’s language and comment style (`//`, `#`, `/* */`, docblocks) and existing conventions.

## When not to comment

Avoid comments that duplicate the code or go stale quickly:

- Obvious variable names and straight-line control flow.
- Restating what types or function names already say.
- Large commented-out dead code—remove it; use version control instead.

Prefer **clear names and small functions** over long explanatory comments when the structure can carry the meaning.

## Comment hygiene

- Keep comments **accurate**: update or delete them when behavior changes.
- Prefer **short** paragraphs or bullet lists next to the relevant code.
- For APIs, prefer **structured doc comments** where the toolchain uses them (JSDoc, TSDoc, Rustdoc, etc.).

## Industry-aligned practices (default bar)

Apply these on new and touched code unless the project’s rules or patterns say otherwise:

- **Readability**: Consistent formatting, meaningful names, early returns, shallow nesting, single-purpose units.
- **Correctness**: Handle or propagate errors explicitly; no silent failures unless intentional and documented.
- **Boundaries**: Validate or sanitize at system edges (user input, network, files); least privilege for secrets and config.
- **Tests**: Meaningful coverage for behavior that matters; align with project test commands and patterns.
- **Dependencies**: Prefer established libraries for security-sensitive or complex domains when the team already uses them.
- **Performance**: Measure before micro-optimizing; document intentional hot paths or allocations.

Do not expand scope or refactor unrelated code to “apply best practices”—only improve what the task touches, per project guidance.

## Checklist before finishing a change

- [ ] Non-obvious “why” and edge cases are documented where needed.
- [ ] No redundant or misleading comments.
- [ ] Style matches surrounding files and project linters/formatters pass.

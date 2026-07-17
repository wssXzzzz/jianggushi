# Karpathy Guidelines

These rules govern all coding work in this repository.

## Think Before Coding

- State assumptions before implementation.
- When requirements are ambiguous, ask or list the valid interpretations.
- Prefer a simpler solution when it meets the same user-visible goal.

## Simplicity First

- Implement only what the current requirement needs.
- Do not add speculative abstractions, configuration, or fallback behavior.
- If the same behavior can be expressed clearly with much less code, rewrite it.

## Surgical Changes

- Change only files and lines required by the task.
- Preserve the surrounding style and avoid unrelated cleanup.
- Every changed line must trace directly to a stated requirement.

## Goal-Driven Execution

- Define verifiable completion criteria before coding.
- Run relevant builds, tests, and runtime checks before claiming completion.
- Report remaining gaps explicitly instead of hiding them behind placeholders.

## Current MVP Completion Criteria

- A parent can upload one child photo and keep it local to the browser.
- The child portrait is visibly placed into all ten pages of each available template.
- Name, age, and the selected education template personalize the story.
- Galaxy Bridge, Star Mail, Bamboo Safety, and Honest Star each provide ten reviewed pages.
- Story generation supports platform DeepSeek, platform Zhipu fallback, and one-time user keys.
- The site remains demonstrable without configured model keys.
- Docker Compose can build and start the application.
- Build, lint, tests, and secret scanning pass before the branch is pushed.

## Explicit Non-Goal

Identity-preserving AI illustration is not part of this MVP until an image-editing provider is selected. The MVP uses local browser portrait placement and must label that behavior honestly.

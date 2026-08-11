# Ask About Ajay CTA — Design

## Goal

Give portfolio visitors a direct way to ask questions about Ajay Darisi through
the existing chat experience at `https://chat.darisi.in`.

## Audience and job

The audience is a visitor who has reached the personal introduction and wants
context about Ajay beyond the concise portfolio copy. The CTA's single job is
to open the dedicated chat, not to start a project enquiry or replace the
email contact path.

## Chosen approach

Add a second action to the featured card in `src/components/sections/Story.tsx`,
immediately after the existing **Ask for my CV** action.

- Label: **Ask about Ajay**
- Destination: `https://chat.darisi.in`
- Behaviour: opens in a new tab with `target="_blank"` and
  `rel="noreferrer"`
- Icon: an existing Lucide message icon, decorative to screen readers
- Analytics: a dedicated CTA event using the established analytics helper

## Visual direction

The control reuses the feature card's existing secondary action treatment:
the card's dark/light feature surface, action border, rounded pill shape,
and restrained upward hover movement. Its wording is the signature: it says
what visitors can do, rather than presenting chat as a generic navigation
destination.

This deliberately avoids a third hero CTA (which would compete with the work
path) and keeps the contact section reserved for project conversations.

## Accessibility and verification

- The visible label provides the accessible name; the icon is `aria-hidden`.
- The existing global keyboard focus style remains in effect.
- External navigation is protected with `rel="noreferrer"`.
- A static test will assert the public chat URL, the action label, and the
  analytics event contract after the production change is made.

## Scope

Only the Story CTA, analytics event declaration, and its focused static test
are in scope. No new component, dependency, API, or chatbot integration is
needed.

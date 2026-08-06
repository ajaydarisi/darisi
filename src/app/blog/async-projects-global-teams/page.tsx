import { PostLayout } from "@/components/blog/post-layout";
import { buildPostMetadata, getBlogPost } from "@/lib/blog";

const post = getBlogPost("async-projects-global-teams");

export const metadata = buildPostMetadata(post);

export default function Post() {
  return (
    <PostLayout post={post}>
      <p>
        The most common hesitation I hear from teams in the US or Europe
        about collaborating across a large time-zone gap has nothing to do
        with skill. It is the time zones. Bengaluru is 9.5 to 12.5 hours
        ahead of the continental US and 3.5 to 4.5 hours ahead of most of
        Europe. If your mental model of collaboration is meetings, that gap
        looks like a dealbreaker.
      </p>
      <p>
        My working process is built on the opposite premise: the time-zone
        gap is only a problem for processes that depend on being awake at
        the same time. Remove that dependency and the gap turns into
        something useful — work happens while you sleep, and you wake up to
        progress you can review with your morning coffee.
      </p>

      <h2>Written updates carry the project</h2>
      <p>
        The backbone of every engagement is the written update. Not a
        “status: green” ritual, but a short document that lets you follow
        the project without ever needing to catch me online:
      </p>
      <ul>
        <li>What moved since the last update, in plain language.</li>
        <li>What I am doing next, so surprises are rare.</li>
        <li>
          Anything blocking me, with what I need from you spelled out
          exactly.
        </li>
        <li>A link to see the current state for yourself.</li>
      </ul>
      <p>
        Writing these takes me minutes and saves both of us hours. It also
        produces a side effect meetings never do: a searchable history of
        every decision and why we made it, which pays off months later when
        someone asks “why does it work this way?”
      </p>

      <h2>Decisions are framed, not just raised</h2>
      <p>
        Async fails when questions cross the ocean half-formed. “What should
        we do about auth?” costs a full day per round trip while we clarify
        what the question even is. So I hold decision points to a stricter
        standard before they reach you: here is the situation, here are the
        options I considered, here is the trade-off each one makes, and here
        is the one I recommend and why.
      </p>
      <p>
        Most of the time you reply with one line and lose nothing to the
        time difference. The gap only hurts when a question needs several
        back-and-forth rounds — so the discipline is making sure questions
        arrive complete enough not to need them.
      </p>

      <h2>Milestones you can click, not read about</h2>
      <p>
        Every project is structured as visible milestones, and “visible”
        means a staging link, not a paragraph claiming progress. From early
        in the engagement there is a deployed version of the product you can
        open, click through, and react to on your own schedule.
      </p>
      <p>
        This matters double in async work, because it removes the trust
        problem that plagues remote contracting. You never have to wonder
        what state the project is really in. You can see it.
      </p>

      <h2>Calls still happen — at the moments they earn</h2>
      <p>
        Async by default does not mean allergic to conversation. Some
        moments genuinely need real-time bandwidth: the initial scoping
        conversation, walking through a milestone that changes direction,
        or any point where written rounds start going in circles. For
        those, the overlap windows work fine — Bengaluru mornings line up
        with US evenings, and Bengaluru afternoons with European mornings.
      </p>
      <p>
        What I avoid is the standing daily call, which quietly converts a
        time-zone gap from a non-issue into a daily tax on somebody’s
        evening.
      </p>

      <h2>What I need from your side</h2>
      <p>
        This process asks two things of the collaborating team, and I say so
        before we
        start:
      </p>
      <ul>
        <li>
          <strong>Someone who can make product decisions.</strong> Not a
          committee — one person empowered to answer “option A or B?”
          without convening a meeting.
        </li>
        <li>
          <strong>Replies within a day, most days.</strong> The same 24-hour
          reply window I commit to. Async collaboration is a rhythm; it
          works when both sides keep it.
        </li>
      </ul>
      <p>
        When those two things are in place, the time-zone gap effectively
        disappears from the project. Decisions made during your workday are
        built during mine, and reviewed again during yours.
      </p>

      <h2>What the first week feels like</h2>
      <p>
        Concretely: we start with a scoping conversation, live. Then the
        rhythm begins — you get a written update with a staging link, you
        reply with reactions and one or two decisions, and the next morning
        the build has moved again. Most clients report the same surprise a
        week in: the project feels calmer and better documented than
        engagements with contractors in their own city.
      </p>
      <p>
        The gap was never the risk. Undisciplined communication was — and
        that risk exists in every time zone.
      </p>
    </PostLayout>
  );
}

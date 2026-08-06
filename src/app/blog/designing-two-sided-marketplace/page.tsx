import { PostLayout } from "@/components/blog/post-layout";
import { buildPostMetadata, getBlogPost } from "@/lib/blog";

const post = getBlogPost("designing-two-sided-marketplace");

export const metadata = buildPostMetadata(post);

export default function Post() {
  return (
    <PostLayout post={post}>
      <p>
        A two-sided marketplace is really two products wearing one interface.
        DevMarket connects clients who post projects with developers who
        respond with proposals — which means every screen, every navigation
        decision, and every notification has to answer the same question
        twice: what does this moment look like for a client, and what does it
        look like for a developer?
      </p>
      <p>
        This post walks through how I approached that on DevMarket, where I
        owned product design, application architecture, role-based
        onboarding, proposal workflows, and the in-product communication
        patterns. The product is{" "}
        <a
          href="https://market.darisi.in/"
          target="_blank"
          rel="noopener noreferrer"
        >
          live
        </a>{" "}
        if you want to click along.
      </p>

      <h2>Onboarding: the fork in the road comes first</h2>
      <p>
        The first design decision in any marketplace is where users declare
        which side they are on. Delay it and every subsequent screen has to
        hedge, showing generic furniture that serves neither side well. So
        DevMarket forks immediately: you join as a client or as a developer,
        and from that moment the product commits to your path.
      </p>
      <p>
        Committing early pays off because the two onboardings genuinely want
        different things. A client needs to get a project posted with as
        little ceremony as possible — the post <em>is</em> their activation
        moment. A developer needs to build enough of a profile that their
        future proposals carry weight. Forcing both journeys through one
        generic flow would make each worse to avoid building two.
      </p>
      <p>
        The architecture followed the same fork. Role is a first-class fact
        in the data model, established at onboarding and enforced in
        authorization — not a UI flag that pages check inconsistently. Every
        later feature got simpler because “who can do what” had one source
        of truth.
      </p>

      <h2>Role-aware navigation, one codebase</h2>
      <p>
        A naive build of a two-sided product slowly becomes two applications
        in a trench coat, with duplicated screens drifting apart. The
        approach that kept DevMarket coherent: shared structure, role-aware
        content. Clients and developers see the same navigation shapes — a
        dashboard, project views, messages — but each surface reads through
        the lens of the viewer’s role. A project page shows a client their
        incoming proposals; it shows a developer the brief and their own
        proposal’s status.
      </p>
      <p>
        One pattern worth stealing: name sections by what they mean to the
        viewer, not by the underlying table. Both roles have “Projects,” but
        for a client that means projects they posted, and for a developer it
        means projects they are pursuing. Same word, same nav slot, correct
        meaning for each side — and nobody has to learn a second vocabulary.
      </p>

      <h2>Proposals: the marketplace’s real transaction</h2>
      <p>
        In a services marketplace, the proposal is where value changes hands
        — long before money does. It deserved the most design attention of
        any workflow, and the effort split evenly across both sides:
      </p>
      <ul>
        <li>
          <strong>For developers,</strong> the proposal form is structured
          rather than a blank text box. Prompting for approach, relevant
          experience, and terms raises the floor on quality — which protects
          the asset the marketplace actually sells: the client’s experience
          of reading responses.
        </li>
        <li>
          <strong>For clients,</strong> proposals arrive as comparable
          cards, not a pile of cover letters. Consistent structure means
          deciding between five responses is scanning, not archaeology.
        </li>
        <li>
          <strong>Status is always legible.</strong> Submitted, seen,
          shortlisted, accepted, declined — a proposal is a small state
          machine, and both sides can always tell where things stand.
          Ambiguity here is where marketplaces leak trust; a developer who
          cannot tell if silence means “not seen yet” or “rejected” stops
          submitting.
        </li>
      </ul>

      <h2>Messaging: scoped to the work, not a chat app</h2>
      <p>
        Every marketplace needs communication, and every marketplace is
        tempted to build a general-purpose messenger. DevMarket’s messaging
        is deliberately narrower: conversations are anchored to a project
        and its proposals, so context travels with the thread. When a client
        opens a conversation, the relevant project and proposal are right
        there — no “which project was this about?” tax on every exchange.
      </p>
      <p>
        Scoping messages this way also draws a clean line through the
        product: negotiation happens in context, decisions get reflected in
        proposal status, and the thread remains a record of how the
        engagement took shape.
      </p>

      <h2>The stack, briefly</h2>
      <p>
        DevMarket runs on Next.js and TypeScript with Supabase behind it and
        TanStack Query managing server state in the client. The interesting
        consequence of that last choice: a marketplace is a multiplayer
        product, where the other side’s actions change your screens. Query
        invalidation gave the app a disciplined way to keep proposal lists
        and conversations fresh without hand-rolled refresh logic scattered
        through the codebase.
      </p>
      <p>
        Supabase’s row-level security did quiet, important work here too:
        authorization rules like “developers see only their own proposals;
        clients see all proposals on their own projects” are enforced in the
        database itself, not re-implemented per page.
      </p>

      <h2>What shipped, and what I would carry forward</h2>
      <p>
        DevMarket shipped as a live marketplace: project posting, structured
        proposals, scoped messaging, and role-aware navigation across both
        sides. Three lessons I would carry into any two-sided build:
      </p>
      <ul>
        <li>
          <strong>Make users pick a side immediately,</strong> and let the
          data model — not just the UI — remember the choice.
        </li>
        <li>
          <strong>Design the transaction artifact hardest.</strong> Whatever
          your marketplace’s equivalent of the proposal is, its structure
          and status legibility carry the product’s trust.
        </li>
        <li>
          <strong>Scope communication to the work.</strong> A worse chat app
          bound to context beats a better one floating free of it.
        </li>
      </ul>
    </PostLayout>
  );
}

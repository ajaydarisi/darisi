import { PostLayout } from "@/components/blog/post-layout";
import { buildPostMetadata, getBlogPost } from "@/lib/blog";

const post = getBlogPost("custom-internal-tools-vs-off-the-shelf");

export const metadata = buildPostMetadata(post);

export default function Post() {
  return (
    <PostLayout post={post}>
      <p>
        I build custom internal tools for a living, so you might expect this
        post to argue that you need one. You probably do not. Most operational
        problems are served perfectly well by spreadsheets, Airtable, Zoho,
        Tally, Retool, or a niche SaaS product built for your industry — at a
        fraction of what custom software costs to build and own.
      </p>
      <p>
        But there is a real category of business where off-the-shelf tooling
        quietly becomes the bottleneck, and the teams inside it usually feel
        the pain long before they name it. This post is about recognizing
        that moment honestly — in either direction.
      </p>

      <h2>Where off-the-shelf wins, and keeps winning</h2>
      <p>
        Off-the-shelf software is the right answer when your process is a
        standard one. Accounting, payroll, support ticketing, email
        marketing, document signing — these workflows are nearly identical
        across millions of companies, which is exactly why the products
        serving them are mature, cheap, and constantly improving without any
        effort from you.
      </p>
      <p>
        The same logic extends further than most people expect. A CRM used
        the standard way, inventory tracking for a conventional catalog, or
        approval flows that fit a form-and-status model are all well served
        by configurable platforms. If your need fits one of these shapes,
        buying is not a compromise — it is simply the correct engineering
        decision, and any developer who tells you otherwise is selling
        something.
      </p>

      <h2>The three triggers that justify custom</h2>
      <p>
        In the projects I have taken on, the case for custom software
        clusters around three situations.
      </p>
      <h3>1. The workflow is how you compete</h3>
      <p>
        Some operations are generic; some are the business. A textile
        wholesaler I built for runs on vouchers, stock movement across
        varieties, receivables, and financial reporting rhythms that are
        specific to how that trade actually works. Forcing that into a
        generic inventory app means either abandoning the practices that make
        the business good at what it does, or maintaining a swamp of
        workarounds, export-import rituals, and side spreadsheets.
      </p>
      <p>
        When the workflow itself is your operational edge, software shaped
        exactly to it stops being a luxury. That project became TexLedger —
        an accounting and inventory workspace where vouchers, stock
        summaries, and receivables live in one structured system instead of
        scattered ledgers.
      </p>
      <h3>2. Per-seat pricing scales against you</h3>
      <p>
        SaaS pricing is designed around teams of knowledge workers. If your
        operation involves many light users — data-entry staff, floor teams,
        branch offices — per-seat costs compound in a way that has nothing to
        do with the value you get. A custom tool inverts the curve: you pay
        for the build once, and the marginal cost of the twentieth user is
        zero. Run the arithmetic over three years, not one; that is usually
        where the answer flips.
      </p>
      <h3>3. You have genuinely outgrown the tools you tried</h3>
      <p>
        This one requires honesty, because “we outgrew Airtable” is
        sometimes true and sometimes an excuse for not learning Airtable.
        The genuine version looks like: relational data too intertwined for
        flat tables, permission rules the platform cannot express,
        integrations held together with brittle automation chains, or
        reports that take someone half a day of manual assembly every week.
        If your team has made a sincere effort with a good off-the-shelf
        tool and the workarounds are still multiplying, that is real signal.
      </p>

      <h2>What custom actually costs</h2>
      <p>
        Anyone advising you to build should also be upfront about the bill.
        Custom software costs more than the build quote: it needs someone
        accountable for it after launch, it evolves as your operation
        evolves, and it does not improve on its own the way a SaaS product
        does. If nobody on your side will own decisions about it, the tool
        will decay no matter how well it was built.
      </p>
      <p>
        This is why I include post-launch support in my engagements and why
        I push clients toward boring, maintainable stacks. But no engagement
        structure removes the underlying truth: custom software is an asset
        you own, and assets need owners.
      </p>

      <h2>The middle path: build the narrowest painful thing</h2>
      <p>
        The decision is rarely all-or-nothing. The pattern that works best
        in my experience: keep everything that fits off-the-shelf tools
        where it is, and build custom only for the one workflow that hurts
        most. For the textile client, that meant starting from vouchers and
        stock — the daily-pain center — rather than attempting a grand ERP
        replacement.
      </p>
      <p>A narrow first build has compounding advantages:</p>
      <ul>
        <li>You learn what your team actually needs from real usage, cheaply.</li>
        <li>The budget risk is bounded — weeks, not quarters.</li>
        <li>
          If the tool earns its keep, you extend it from evidence. If it
          does not, you have your answer at a fraction of the cost.
        </li>
      </ul>

      <h2>How to decide in a week</h2>
      <p>A practical sequence you can run without hiring anyone:</p>
      <ol>
        <li>
          Write down the three workflows that consume the most time or cause
          the most errors. Be specific about the steps, not the feelings.
        </li>
        <li>
          For each, ask: is this a standard process, or is it specific to
          how we operate? Standard processes get an off-the-shelf search.
        </li>
        <li>
          For the specific ones, count the workaround tax: hours per week of
          manual assembly, error rates, decisions delayed because the
          numbers were not ready.
        </li>
        <li>
          Price a three-year view of both paths — subscriptions and
          workaround hours on one side, a scoped build plus ownership on the
          other.
        </li>
      </ol>
      <p>
        If the arithmetic is close, stay off-the-shelf; the option value of
        not owning software is worth a lot. When one workflow is clearly
        carrying an unreasonable tax, scope a build around exactly that
        workflow and nothing else.
      </p>
    </PostLayout>
  );
}

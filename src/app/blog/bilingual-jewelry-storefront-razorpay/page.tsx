import { PostLayout } from "@/components/blog/post-layout";
import { buildPostMetadata, getBlogPost } from "@/lib/blog";

const post = getBlogPost("bilingual-jewelry-storefront-razorpay");

export const metadata = buildPostMetadata(post);

export default function Post() {
  return (
    <PostLayout post={post}>
      <p>
        Bhagyalakshmi Future Gold is not a typical e-commerce client. Most of
        their customers are shopping for weddings, most of their business is
        rentals rather than sales, and a large share of their audience is more
        comfortable browsing in Telugu than in English. Each of those three
        facts breaks an assumption that off-the-shelf storefront templates
        quietly make. Together, they shaped the whole project.
      </p>
      <p>
        This post walks through how I approached it: what the business
        actually needed, the decisions that mattered, and what I would tell
        anyone planning a storefront with similar constraints.
      </p>

      <h2>Wedding shoppers buy trust before they buy jewelry</h2>
      <p>
        A wedding purchase is high-stakes and emotionally loaded. Nobody
        casually adds bridal jewelry to a cart the way they would a phone
        case. Shoppers arrive skeptical, compare across stores, and involve
        the whole family in the decision.
      </p>
      <p>
        That changed how I weighted the design work. Before any feature
        discussion, the storefront had to look and behave like a business you
        would trust with an important occasion: premium merchandising,
        consistent photography treatment, unambiguous pricing, and no dark
        patterns anywhere near the purchase flow. A storefront that feels
        cheap costs this business real revenue in a way that an analytics
        dashboard never would.
      </p>
      <p>
        In practice that meant spending real design time on the catalog pages
        — the place comparison shoppers actually live — instead of only
        polishing the homepage. Catalog depth was itself a challenge: the
        inventory is large, so browsing needed strong category structure and
        filtering that holds up when a family is hunting for one specific
        style of necklace.
      </p>

      <h2>Bilingual UX is a content problem, not a translation problem</h2>
      <p>
        The most common way bilingual sites go wrong is treating the second
        language as an afterthought: build everything in English, then run
        the strings through translation. The result reads as foreign to the
        people it was meant to welcome.
      </p>
      <p>
        For this project, Telugu was first-class. That decision has concrete
        technical consequences:
      </p>
      <ul>
        <li>
          <strong>The content model carries both languages.</strong> Product
          names, descriptions, and category labels exist in English and
          Telugu as real content fields, not as a translation layer bolted
          on top.
        </li>
        <li>
          <strong>Admin workflows enforce completeness.</strong> The team
          managing the catalog enters both languages when adding a product,
          so the Telugu experience never lags behind with untranslated gaps.
        </li>
        <li>
          <strong>Layouts are tested in both scripts.</strong> Telugu strings
          run longer than their English equivalents often enough that
          navigation, buttons, and cards all had to be checked in both
          languages, not just the one the designer speaks.
        </li>
      </ul>
      <p>
        None of this is exotic engineering. It is mostly the discipline of
        deciding early that both languages matter equally, and letting that
        decision flow through the schema, the admin tools, and the QA pass.
      </p>

      <h2>Rentals invert the merchandising model</h2>
      <p>
        Standard e-commerce assumes you are selling objects that leave
        forever. A rental-first jewelry business works differently: the same
        piece serves many customers, availability matters as much as price,
        and the primary call to action is not “buy now.”
      </p>
      <p>
        So the merchandising leads with rentals. Product presentation,
        category structure, and calls to action are built around the rental
        offer, with outright purchase as the secondary path rather than the
        default. Getting this hierarchy right was more important than any
        individual feature — it is the difference between a storefront that
        reflects the business and one that fights it.
      </p>

      <h2>Payments: Razorpay, and respecting the failure cases</h2>
      <p>
        Checkout runs on Razorpay, which is a good fit for an Indian business
        because it covers the payment methods customers actually use — UPI,
        cards, netbanking — behind one integration.
      </p>
      <p>
        The integration work that matters is not the happy path. Razorpay’s
        checkout takes an afternoon to wire up; the real effort goes into the
        edges:
      </p>
      <ul>
        <li>
          Payments that are abandoned mid-checkout, so orders do not end up
          in a half-created state.
        </li>
        <li>
          Verifying payment outcomes server-side rather than trusting what
          the browser reports, so an order is only confirmed when the money
          movement actually is.
        </li>
        <li>
          Clear, calm error states in both languages when a payment fails —
          because a confusing failure message during a wedding purchase is
          how you lose a customer permanently.
        </li>
      </ul>
      <p>
        This is a pattern I see across payment projects: the gateway choice
        matters less than how seriously the build treats the unhappy paths.
      </p>

      <h2>The admin side nobody sees</h2>
      <p>
        A storefront is only as good as the team’s ability to keep it
        current. Alongside the customer-facing build, the project included
        admin workflows for managing the catalog — products, categories,
        imagery, and both language variants — so the business can run the
        store without a developer in the loop.
      </p>
      <p>
        The stack is Next.js with Supabase behind it and Tailwind CSS for
        the interface — deliberately boring choices that keep the site fast,
        the admin workflows straightforward, and the long-term maintenance
        cost low.
      </p>

      <h2>What shipped</h2>
      <p>
        The result is a polished bilingual storefront: English and Telugu
        throughout, rental-led merchandising, cleaner purchase paths, and an
        admin layer the team operates themselves. You can{" "}
        <a
          href="https://bfg.darisi.in/"
          target="_blank"
          rel="noopener noreferrer"
        >
          browse the live site
        </a>{" "}
        to see it in practice.
      </p>

      <h2>If you are planning something similar</h2>
      <p>Three things I would carry into any comparable project:</p>
      <ul>
        <li>
          <strong>Name your real primary action first.</strong> If your
          business is rental-first, subscription-first, or quote-first,
          decide that before design starts — retrofitting it later touches
          every page.
        </li>
        <li>
          <strong>If a second language matters, put it in the schema.</strong>{" "}
          A translation layer bolted on at the end always shows.
        </li>
        <li>
          <strong>Budget payment work by its edge cases.</strong> The
          integration demo is quick; the trustworthy version is the actual
          project.
        </li>
      </ul>
    </PostLayout>
  );
}

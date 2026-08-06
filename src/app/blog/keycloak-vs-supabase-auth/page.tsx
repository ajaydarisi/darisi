import { PostLayout } from "@/components/blog/post-layout";
import { buildPostMetadata, getBlogPost } from "@/lib/blog";

const post = getBlogPost("keycloak-vs-supabase-auth");

export const metadata = buildPostMetadata(post);

export default function Post() {
  return (
    <PostLayout post={post}>
      <p>
        Keycloak and Supabase Auth come up together constantly, but comparing
        them feature-by-feature misses the point: they are different kinds of
        tool. Supabase Auth is an authentication layer for a product. Keycloak
        is an identity provider for an organization. I have shipped client
        projects on both, and nearly every painful auth decision I have seen
        came from picking one when the situation called for the other.
      </p>

      <h2>What each one actually is</h2>
      <p>
        <strong>Supabase Auth</strong> is the authentication service inside
        the Supabase platform. It handles sign-up, sign-in, sessions, email
        and phone verification, magic links, OTPs, and the usual social
        logins. Users live in your Postgres database, and auth state plugs
        directly into row-level security — the database itself enforces who
        can read what. If your product already runs on Supabase, auth arrives
        nearly for free and stays inside the stack you operate anyway.
      </p>
      <p>
        <strong>Keycloak</strong> is a full open-source identity and access
        management server. It speaks OpenID Connect and SAML, supports single
        sign-on across many applications, federates against existing user
        directories like LDAP and Active Directory, and models realms,
        clients, roles, and groups with a depth that product auth layers do
        not attempt. You run it yourself — it is a piece of infrastructure
        with its own upgrades, monitoring, and configuration surface.
      </p>
      <p>
        That last sentence is the crux of the decision, so it is worth
        sitting with: one is a feature of a platform you already use, the
        other is a server you commit to operating.
      </p>

      <h2>Where Supabase Auth is the right call</h2>
      <p>
        For a single product — a SaaS app, a storefront, a client portal, an
        internal dashboard — Supabase Auth is usually the correct default,
        for reasons that compound:
      </p>
      <ul>
        <li>
          <strong>Time to working auth is measured in hours.</strong>{" "}
          Sign-up, sessions, password resets, and social logins are
          configuration, not projects.
        </li>
        <li>
          <strong>Row-level security is the sleeper feature.</strong>{" "}
          Authorization rules live in the database as policies — “users see
          their own orders, admins see all” is enforced even if application
          code has a bug. In my builds this has prevented more real-world
          permission mistakes than any framework pattern.
        </li>
        <li>
          <strong>Nothing new to operate.</strong> No extra server, no
          upgrade cycle, no separate thing to monitor at 3am.
        </li>
      </ul>
      <p>
        The honest limitations: it authenticates users for one product
        ecosystem. It is not built to be the shared login across a fleet of
        unrelated applications, it will not federate against a corporate
        directory, and if a big enterprise customer asks to bring their own
        SAML identity provider, you are stretching it beyond its design.
      </p>

      <h2>Where Keycloak earns its operational cost</h2>
      <p>Keycloak stops being over-engineering in a few specific situations:</p>
      <ul>
        <li>
          <strong>Multiple applications, one login.</strong> When users need
          to sign in once and move between several apps — a customer portal,
          an admin system, a partner tool — SSO is Keycloak’s core purpose.
        </li>
        <li>
          <strong>Existing identity to integrate.</strong> If the
          organization already has LDAP or Active Directory, Keycloak
          federates against it instead of forcing a second user store into
          existence.
        </li>
        <li>
          <strong>Enterprise customers with SSO demands.</strong> B2B
          products above a certain deal size get asked for SAML or OIDC
          against the customer’s own identity provider. Keycloak was built
          for exactly this conversation.
        </li>
        <li>
          <strong>A hard self-hosting requirement.</strong> Some regulated or
          data-sovereignty-conscious clients require identity to run on
          their own infrastructure. Keycloak satisfies that cleanly.
        </li>
      </ul>
      <p>
        The cost is real, and anyone recommending Keycloak should say it
        plainly: you are now operating an identity server. Realm
        configuration has genuine depth, version upgrades need attention,
        and misconfiguration failure modes are security failure modes. In
        client work I treat Keycloak as a deliberate infrastructure
        decision, never a default.
      </p>

      <h2>The comparison that actually matters</h2>
      <p>
        Feature tables make the two look closer than they are — both do
        social login, both do MFA, both issue tokens. The real differences
        are structural:
      </p>
      <ul>
        <li>
          <strong>Scope:</strong> one product’s users vs. an organization’s
          identity across many systems.
        </li>
        <li>
          <strong>Operations:</strong> a managed feature vs. a server you
          run and upgrade.
        </li>
        <li>
          <strong>Authorization model:</strong> database row-level security
          vs. realm and role structures that applications interpret.
        </li>
        <li>
          <strong>Protocol depth:</strong> Supabase covers modern OAuth and
          OIDC needs; Keycloak adds SAML and directory federation for the
          enterprise world.
        </li>
      </ul>

      <h2>A decision framework</h2>
      <p>The questions I walk clients through, in order:</p>
      <ol>
        <li>
          <strong>How many applications share these users?</strong> One
          product: Supabase Auth. Several needing one login: Keycloak.
        </li>
        <li>
          <strong>Does identity already exist somewhere?</strong> A
          corporate directory to federate: Keycloak. Fresh user base: no
          reason to leave your stack.
        </li>
        <li>
          <strong>Will enterprise customers bring their own SSO?</strong> If
          that is genuinely on the roadmap — not hypothetically — weight
          Keycloak. If it is speculative, do not pay today for a requirement
          that may never arrive.
        </li>
        <li>
          <strong>Who operates this?</strong> No one available to own an
          identity server means Keycloak’s flexibility becomes a liability,
          whatever the feature list says.
        </li>
      </ol>
      <p>
        A pattern worth naming from real projects: teams that picked the
        heavier tool “to be safe” spend months of accumulated friction on
        flexibility they never use, while teams that outgrow the lighter
        tool discover that migration, while annoying, is a bounded and
        well-understood project. Under genuine uncertainty, the lighter
        choice is usually the cheaper mistake.
      </p>

      <h2>Can you use both?</h2>
      <p>
        Yes, and sometimes it is the honest architecture: Supabase Auth (or
        any OIDC-capable product auth) can treat Keycloak as an upstream
        identity provider, so the product keeps its simple stack while the
        organization keeps its central identity. This is a useful path when
        a product born on Supabase later lands enterprise customers with SSO
        requirements — the arrival of that requirement, not its
        anticipation, is the right trigger for the added complexity.
      </p>
    </PostLayout>
  );
}

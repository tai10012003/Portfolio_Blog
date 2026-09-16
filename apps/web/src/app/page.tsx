const navItems = ["About", "Skills", "Experience", "Projects", "Blog", "Contact"];

const stats = [
  { label: "Focus", value: "Fullstack" },
  { label: "Stack", value: "React / Node" },
  { label: "Writing", value: "Dev Notes" },
];

const featuredSections = [
  {
    title: "Portfolio",
    description:
      "Gioi thieu nang luc, kinh nghiem, ky nang va nhung du an noi bat da thuc hien.",
  },
  {
    title: "Blog",
    description:
      "Chia se kien thuc lap trinh, loi tung gap, cach xu ly va bai hoc khi lam Developer.",
  },
  {
    title: "Contact",
    description:
      "Ket noi qua email, social links va form lien he cho co hoi cong viec hoac hop tac.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f7f7f2] text-[#17211b]">
      <header className="border-b border-[#d8d8cf] bg-[#f7f7f2]/90 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a className="text-base font-semibold tracking-wide" href="#">
            Portfolio_Blog
          </a>
          <div className="hidden items-center gap-6 text-sm font-medium text-[#526057] md:flex">
            {navItems.map((item) => (
              <a className="transition hover:text-[#17211b]" href={`#${item.toLowerCase()}`} key={item}>
                {item}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div className="flex flex-col justify-center">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-[#517a66]">
            Fullstack Developer Portfolio
          </p>
          <h1 className="max-w-3xl text-5xl font-bold leading-[1.05] text-[#17211b] sm:text-6xl lg:text-7xl">
            Xay dung ho so nang luc va chia se hanh trinh Developer.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#526057]">
            Website ca nhan ket hop portfolio va blog ky thuat, noi tong hop kinh nghiem,
            du an, cong nghe va nhung bai hoc thuc te trong qua trinh lam san pham.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              className="inline-flex items-center justify-center rounded-md bg-[#17211b] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2b3d32]"
              href="#projects"
            >
              Xem du an
            </a>
            <a
              className="inline-flex items-center justify-center rounded-md border border-[#bfc7be] px-5 py-3 text-sm font-semibold text-[#17211b] transition hover:border-[#17211b]"
              href="#blog"
            >
              Doc blog
            </a>
          </div>
        </div>

        <div className="rounded-lg border border-[#d8d8cf] bg-white p-5 shadow-sm">
          <div className="aspect-[4/3] rounded-md bg-[#17211b] p-6 text-white">
            <div className="flex h-full flex-col justify-between">
              <div>
                <p className="text-sm font-medium text-[#a8cab8]">Current Direction</p>
                <h2 className="mt-3 text-3xl font-semibold">React, Node.js, Docker, AWS, System Design</h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div className="rounded-md bg-white/10 p-4" key={stat.label}>
                    <p className="text-xs uppercase tracking-[0.16em] text-[#a8cab8]">{stat.label}</p>
                    <p className="mt-2 text-lg font-semibold">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#d8d8cf] bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-12 md:grid-cols-3">
          {featuredSections.map((section) => (
            <article className="rounded-lg border border-[#d8d8cf] p-6" key={section.title}>
              <h2 className="text-xl font-semibold text-[#17211b]">{section.title}</h2>
              <p className="mt-4 leading-7 text-[#526057]">{section.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

import "./auth-layout.css";

const sampleFarms = [
  { name: "Farm 1", revenue: "₦3.2M", share: 30 },
  { name: "Farm 2", revenue: "₦2.9M", share: 22 },
  { name: "Farm 3", revenue: "₦4.1M", share: 48 },
];

function Logo() {
  return <div className="flex items-center gap-2.5 text-xl font-semibold min-[90rem]:text-2xl"><span className="flex size-10 items-center justify-center rounded bg-black text-white min-[90rem]:size-12">A</span>Agriflow</div>;
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="agriflow-auth grid min-h-dvh min-w-0 bg-white font-sans text-[#292929] [color-scheme:light] md:grid-cols-[46fr_54fr]">
      <aside data-auth-marketing className="hidden min-w-0 flex-col border-r border-[#e2e2e2] bg-[#f4f4f4] px-6 py-8 md:flex lg:px-10 lg:py-10 min-[90rem]:px-[clamp(48px,4vw,80px)] min-[90rem]:py-12">
        <Logo />
        <div data-auth-marketing-content className="mt-12 mb-10 w-full max-w-[640px] lg:mt-16 min-[90rem]:mt-20">
          <p className="mb-4 text-[11px] tracking-[0.12em] uppercase min-[90rem]:text-xs">Farm management, simplified</p>
          <h2 className="text-[28px] leading-[1.2] font-semibold tracking-tight lg:text-[34px] min-[90rem]:text-[clamp(38px,2.5vw,48px)]">Your farms. Your numbers.<br />One clear overview.</h2>
          <p className="mt-4 text-sm leading-6 text-[#606060] min-[90rem]:text-base">Stay on top of livestock, production and finances.<br />Make informed decisions for every farm you manage.</p>
          <div aria-label="Sample farm portfolio figures" className="mt-7 grid grid-cols-1 gap-4 lg:grid-cols-2 min-[90rem]:mt-8 min-[90rem]:gap-5">
            <section className="min-h-[132px] rounded-[20px] border border-[#d3d3d3] bg-[#f7f7f7] p-5 min-[90rem]:min-h-[156px] min-[90rem]:p-6">
              <h3 className="text-[10px] tracking-[0.1em] uppercase min-[90rem]:text-xs">Livestock Count</h3>
              <p className="mt-3 text-[28px] leading-tight font-extrabold min-[90rem]:text-[34px]">14,527</p>
              <p className="mt-3 text-xs text-[#606060]">Head across 3 farms · Sample</p>
            </section>
            <section className="min-h-[132px] rounded-[20px] border border-[#d3d3d3] bg-[#f7f7f7] p-5 min-[90rem]:min-h-[156px] min-[90rem]:p-6">
              <h3 className="text-[10px] tracking-[0.1em] uppercase min-[90rem]:text-xs">Total Revenue</h3>
              <p className="mt-3 text-[28px] leading-tight font-extrabold min-[90rem]:text-[34px]">₦10.2M</p>
              <p className="mt-3 text-xs text-[#606060]">Portfolio overview · Sample</p>
            </section>
          </div>
          <section className="mt-4 rounded-[20px] border border-[#d3d3d3] bg-[#f7f7f7] p-5 min-[90rem]:mt-5 min-[90rem]:p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-2"><h3 className="text-sm font-semibold min-[90rem]:text-base">Revenue by Farm</h3><span className="text-[10px] text-[#888888] uppercase min-[90rem]:text-xs">Sample overview</span></div>
            <div className="space-y-5 min-[90rem]:space-y-6">
              {sampleFarms.map((farm) => <div key={farm.name}>
                <div className="mb-2 flex justify-between gap-2 text-sm min-[90rem]:text-base"><span>{farm.name}</span><span className="font-semibold">{farm.revenue}</span></div>
                <div aria-hidden="true" className="h-2 overflow-hidden rounded-full bg-[#e5e5e5]"><div className="h-full rounded-full bg-black" style={{ width: `${farm.share}%` }} /></div>
                <p className="mt-2 text-[11px] text-[#606060] min-[90rem]:text-xs">{farm.share}% of Total Revenue</p>
              </div>)}
            </div>
          </section>
        </div>
        <p className="mt-auto text-xs text-[#606060]">© 2026 Agriflow. All rights reserved.</p>
      </aside>
      <div data-auth-panel className="flex min-w-0 flex-col px-5 py-7 sm:px-8 md:py-8 lg:px-10 lg:py-10 min-[90rem]:px-[clamp(48px,4vw,80px)] min-[90rem]:py-12">
        <div className="mb-6 md:hidden"><Logo /></div>
        {children}
        <footer className="mt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-[#606060]">
          <span>Need help? <button type="button" disabled title="Support destination is not available yet">Contact support</button></span>
          <div className="flex gap-4"><button type="button" disabled title="Privacy policy is not available yet">Privacy</button><button type="button" disabled title="Terms of Service are not available yet">Terms</button></div>
        </footer>
      </div>
    </div>
  );
}

import { FarmIcon } from "../_components/farm-icon";
import { DemoDataNotice } from "../_components/demo-data-notice";

const metrics = [
  { label: "Revenue (This Month)", value: "₦0.5M", detail: "0% margin", change: "+20%" },
  { label: "Expenses (This Month)", value: "₦0.2M", detail: "0% margin", change: "+20%" },
  { label: "Net Profit (This Month)", value: "₦0.3M", detail: "0% margin", change: "+10%" },
  { label: "Active Batches", value: "1", detail: "7000 Animals" },
];

const statuses = [
  { label: "Healthy", count: 1, colors: "bg-[#ecfcf5] text-[#00a51a]" },
  { label: "Warning", count: 0, colors: "bg-[#fff0e6] text-[#ac4a00]" },
  { label: "Critical", count: 0, colors: "bg-[#fff2f4] text-[#b20e13]" },
];

function FarmChart() {
  return (
    <section aria-labelledby="farm-chart-title" className="flex min-h-[340px] min-w-0 flex-col rounded-[28px] bg-white p-3.5">
      <div className="flex items-start justify-between"><div><h2 id="farm-chart-title" className="text-sm font-medium tracking-normal">Farm Chart</h2><p className="text-[9px] leading-[11px]">2nd, Jan. 2026</p></div><span className="flex size-8 items-center justify-center rounded-full border border-[#c9c9c9] bg-[#eeeeee]"><FarmIcon name="expand" /></span></div>
      <div className="mt-1.5 flex items-center justify-between px-1 text-[11px] leading-4 font-medium"><span>Weight Gain</span><span className="mr-5 flex h-8 items-center gap-3 rounded-full bg-[#e3ffdb] px-2.5 text-sm font-semibold"><span className="text-base text-[#23cf00]">↑</span>32.7%</span></div>
      <div className="mt-3 flex min-h-0 flex-1 items-center justify-center">
      <svg viewBox="0 0 360 220" className="block w-full max-w-[324px]" role="img" aria-labelledby="chart-title chart-description">
        <title id="chart-title">Illustrative farm weight gain chart</title><desc id="chart-description">Static mock chart with three example weight trends, not actual farm records.</desc>
        <defs><linearGradient id="purple-fill" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#d6a8ed" stopOpacity=".45" /><stop offset="1" stopColor="#d6a8ed" stopOpacity=".05" /></linearGradient></defs>
        {[20, 51, 82, 113, 144, 175].map((y, i) => <g key={y}><path d={`M40 ${y}H342`} stroke="#dedede" strokeDasharray="2 2" /><text x="35" y={y + 4} textAnchor="end" fontSize="9" fill="#777">{100 - i * 20}</text></g>)}
        {[40, 90, 140, 190, 240, 290, 342].map((x) => <path key={x} d={`M${x} 20V175`} stroke="#dedede" strokeDasharray="2 2" />)}
        <path d="M65 102C87 98 88 31 115 33S140 87 165 93 187 22 215 26 239 94 265 103 291 136 317 144V175H65Z" fill="url(#purple-fill)" />
        <path d="M65 92C85 110 91 81 115 87S143 141 165 150 187 84 215 84 243 66 265 69 291 82 317 83V175H65Z" fill="#bcf6a5" fillOpacity=".25" />
        <path d="M65 102C84 109 93 62 115 62S141 116 165 123 190 107 215 108 242 90 265 91 289 122 317 128V175H65Z" fill="#f0c98c" fillOpacity=".2" />
        <path d="M65 102C87 98 88 31 115 33S140 87 165 93 187 22 215 26 239 94 265 103 291 136 317 144" fill="none" stroke="#cc80ff" />
        <path d="M65 92C85 110 91 81 115 87S143 141 165 150 187 84 215 84 243 66 265 69 291 82 317 83" fill="none" stroke="#7aec72" />
        <path d="M65 102C84 109 93 62 115 62S141 116 165 123 190 107 215 108 242 90 265 91 289 122 317 128" fill="none" stroke="#dba04a" />
        <path d="M40 175H342" stroke="#aaaaaa" />
        {['Day 1', 'Day 6', 'Day 12', 'Day 18', 'Day 24', 'Day 30'].map((label, i) => <text key={label} x={65 + i * 50} y="189" textAnchor="middle" fontSize="9" fill="#777">{label}</text>)}
        {[{ color: '#cc80ff', label: 'Batch A' }, { color: '#7aec72', label: 'Batch B' }, { color: '#dba04a', label: 'Batch C' }].map((item, i) => <g key={item.label}><circle cx={116 + i * 65} cy="206" r="2" fill={item.color} /><text x={122 + i * 65} y="209" fontSize="8" fill="#777">{item.label}</text></g>)}
      </svg>
      </div>
      <div className="mx-auto mt-2 flex w-fit shrink-0 gap-1.5 rounded-full bg-[#eeeeee] px-3 py-2" aria-hidden="true">{[0, 1, 2, 3, 4].map((dot) => <span key={dot} className={`size-2 rounded-full ${dot === 2 ? "bg-black" : "bg-[#aaaaaa]"}`} />)}</div>
    </section>
  );
}

export default function DashboardPage() {
  return (
    <div className="flex min-w-0 flex-col gap-4 sm:gap-5 xl:min-h-[calc(100dvh-96px)] xl:gap-[14px]">
      <h1 className="sr-only">Farm dashboard</h1>
      <DemoDataNotice module="dashboard" />
      <div className="grid shrink-0 grid-cols-1 gap-[14px] sm:grid-cols-2 xl:max-w-[1266px] xl:grid-cols-[repeat(4,minmax(0,306px))]">
        {metrics.map((metric) => <section key={metric.label} aria-label={metric.label} className="flex min-h-[103px] min-w-0 flex-col justify-between rounded-[30px] border border-[#CCCCCC] bg-white px-[14px] py-3 xl:h-[145px]">
          <h2 className="text-[11px] leading-[14px] font-normal tracking-[0.1em] text-[#262626] uppercase">{metric.label}</h2>
          <div className="mt-4 flex items-end justify-between gap-2"><div><p className="text-[20px] leading-[24px] font-extrabold tracking-normal text-[#262626]">{metric.value}</p><p className="text-[10px] leading-[14px] text-[#333333]">{metric.detail}</p></div>{metric.change && <span className="mb-0.5 flex h-7 items-center gap-2 rounded-full bg-[#edffe7] px-2 text-[11px] leading-4 font-semibold"><FarmIcon name="trend" className="size-3 text-[#36c522]" />{metric.change}</span>}</div>
        </section>)}
      </div>
      <div className="grid min-w-0 gap-4 sm:gap-5 xl:flex-1 xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] xl:gap-3">
        <section aria-labelledby="weight-trend-title" className="min-h-[280px] min-w-0 rounded-[28px] bg-white p-5 sm:min-h-[320px] sm:p-7">
          <h2 id="weight-trend-title" className="text-[24px] leading-[1] font-semibold tracking-normal text-[#000000]">Weight Trend (30 Days)</h2>
          <p className="text-[16px] leading-[1] font-normal tracking-normal text-[#000000]">Average weight recorded across each active batch.</p>
          <p className="mt-6 text-sm leading-5 text-[#606060]">No live weight trend available. Daily recording is not connected yet.</p>
        </section>
        <div className="grid min-w-0 gap-4 sm:gap-5 xl:grid-rows-[minmax(340px,1fr)_minmax(147px,auto)] xl:gap-6">
          <FarmChart />
          <section aria-labelledby="batch-status-title" className="flex min-h-[147px] flex-col rounded-[28px] bg-white p-3.5">
            <h2 id="batch-status-title" className="text-sm font-medium tracking-normal">Batch Status</h2>
            <div className="mt-1 grid flex-1 grid-cols-3 gap-2 sm:gap-3.5 sm:px-1 xl:pr-[38px]">{statuses.map((status) => <div key={status.label} className={`flex min-h-[99px] min-w-0 flex-col items-center justify-center gap-1.5 rounded-[22px] ${status.colors}`}><p className="text-2xl leading-7 font-semibold">{status.count}</p><p className="text-[10px] leading-[14px] font-medium">{status.label}</p></div>)}</div>
          </section>
        </div>
      </div>
    </div>
  );
}

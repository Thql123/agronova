import type { Metadata } from "next";
import { FarmIcon } from "../_components/farm-icon";
import { mockAttendees, mockMeetings, mockMeetingSummary } from "./mock-meetings";
import styles from "./meetings.module.css";

export const metadata: Metadata = {
  title: "Meeting & Schedule | Agriflow",
  description: "View and edit upcoming and scheduled meeting",
};

const labelClasses = "mb-1 block text-[11px] leading-4 tracking-[0.1em] text-[#606060] uppercase";
const inputClasses = "w-full min-w-0 rounded-lg border-0 bg-[#f4f4f4] px-2.5 text-xs text-black placeholder:text-[#888888] focus:outline-none focus-visible:inset-ring-2 focus-visible:inset-ring-black";

export default function MeetingsPage() {
  return (
    <div className="flex min-h-[calc(100dvh-155px)] min-w-0 flex-col sm:min-h-[calc(100dvh-163px)] lg:min-h-[calc(100dvh-171px)] xl:h-[calc(100dvh-96px)] xl:min-h-0 xl:px-[22px] xl:pt-6">
      <div className="mb-1.5 flex shrink-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-lg leading-6 font-semibold">Meeting &amp; Schedule</h1>
          <p className="text-sm leading-5">View and edit upcoming and scheduled meeting</p>
        </div>
        <button type="button" disabled title="Scheduling meetings is coming soon" className="mb-2 flex h-8 w-fit shrink-0 items-center gap-2 rounded-lg bg-black px-2.5 text-sm font-medium text-white sm:mb-0">
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M10 3v14M3 10h14" /></svg>
          Schedule Meeting
        </button>
      </div>

      <div className="mb-4 grid w-full max-w-[760px] shrink-0 grid-cols-1 gap-4 sm:grid-cols-3">
        {mockMeetingSummary.map((metric) => (
          <section key={metric.label} aria-label={metric.label} className="min-h-[104px] min-w-0 rounded-[16px] border border-[#d6d6d6] bg-white px-5 py-4">
            <h2 className="text-[11px] leading-4 tracking-[0.1em] text-[#262626] uppercase">{metric.label}</h2>
            <p className="mt-4 text-xl leading-6 font-extrabold">{metric.value}</p>
          </section>
        ))}
      </div>

      <div className="grid min-w-0 items-start gap-3.5 xl:min-h-0 xl:flex-1 xl:grid-cols-[minmax(0,44fr)_minmax(0,56fr)] xl:grid-rows-[minmax(0,1fr)] xl:items-stretch">
        <section aria-labelledby="quick-schedule-title" className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-[28px] border border-[#CCCCCC] bg-white p-5">
          <h2 id="quick-schedule-title" className="mb-3 shrink-0 text-xl leading-7 font-semibold">Quick Schedule</h2>
          <div className={`${styles.scrollArea} flex flex-col gap-3 xl:-mr-4 xl:min-h-0 xl:flex-1 xl:overflow-y-auto xl:pr-4`}>
            <div className="shrink-0">
              <label htmlFor="meeting-title" className={labelClasses}>Title</label>
              <input id="meeting-title" type="text" placeholder="Meeting Title" className={`${inputClasses} h-[34px]`} />
            </div>
            <div className="grid min-w-0 shrink-0 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-9">
              <div>
                <label htmlFor="meeting-date" className={labelClasses}>Date</label>
                <input id="meeting-date" type="text" placeholder="mm/dd/yyyy" className={`${inputClasses} h-[34px]`} />
              </div>
              <div>
                <label htmlFor="meeting-time" className={labelClasses}>Time</label>
                <input id="meeting-time" type="text" className={`${inputClasses} h-[34px]`} />
              </div>
            </div>
            <fieldset className="shrink-0">
              <legend className={labelClasses}>Attendees</legend>
              <div className="space-y-2 rounded-lg bg-[#f4f4f4] p-3.5">
                {mockAttendees.map((attendee) => (
                  <div key={attendee.id} className="flex min-w-0 items-center gap-2 rounded-lg bg-white p-2">
                    <span aria-hidden="true" className="flex size-[22px] shrink-0 items-center justify-center rounded-full bg-[#d9d9d9] text-xs">{attendee.initial}</span>
                    <span className="min-w-0 flex-1 text-xs leading-4 font-semibold [overflow-wrap:anywhere]">{attendee.name}</span>
                    <button type="button" role="switch" aria-checked={false} aria-label={`Include ${attendee.name}`} disabled title="Attendee selection is coming soon" className="flex h-[14px] w-[27px] shrink-0 items-center rounded-full bg-[#dddddd] p-[2px]">
                      <span className="size-[10px] rounded-full bg-white" />
                    </button>
                  </div>
                ))}
              </div>
            </fieldset>
            <div className="flex min-h-[136px] shrink-0 flex-col xl:flex-1">
              <label htmlFor="meeting-agenda" className={labelClasses}>Agenda</label>
              <textarea id="meeting-agenda" placeholder="Meeting agenda..." rows={3} className={`${inputClasses} block min-h-[116px] flex-1 resize-y py-2.5 xl:resize-none`} />
            </div>
          </div>
        </section>

        <section aria-label="Meetings" className="min-w-0 space-y-3.5 xl:self-start">
          {mockMeetings.map((meeting) => (
            <article key={meeting.id} aria-labelledby={`${meeting.id}-title`} className="min-w-0 rounded-[22px] border border-[#CCCCCC] bg-white px-3.5 py-4 xl:min-h-[132px] xl:py-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 flex-wrap items-center gap-2">
                  <h2 id={`${meeting.id}-title`} className="text-base leading-6 font-semibold [overflow-wrap:anywhere]">{meeting.title}</h2>
                  <span className="rounded-full border border-[#999999] bg-[#eeeeee] px-3 py-1 text-[11px] leading-4">{meeting.status}</span>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button type="button" disabled aria-label={`Edit ${meeting.title}`} title="Editing meetings is coming soon" className="flex size-8 items-center justify-center rounded-lg bg-[#e3e3e3]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 5 4 4M4 20l1-5L17 3a2.8 2.8 0 0 1 4 4L9 19z" /></svg>
                  </button>
                  <button type="button" disabled aria-label={`Delete ${meeting.title}`} title="Deleting meetings is coming soon" className="flex size-8 items-center justify-center rounded-lg bg-[#fcedef] text-[#ff0015]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 6h18M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7M14 10v7" /></svg>
                  </button>
                </div>
              </div>
              <p className="mt-2 flex items-center gap-1.5 text-xs leading-5"><FarmIcon name="meeting" className="size-4 shrink-0" /><time dateTime={`${meeting.date}T${meeting.time}`}>{meeting.date} at {meeting.time}</time></p>
              <p className="mt-1.5 text-xs leading-5">{meeting.description}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs leading-5">
                <span>Attendees:</span>
                {meeting.attendees.map((initials) => (
                  <span key={initials} className="flex size-[23px] items-center justify-center rounded-full border border-[#c7c7c7] bg-[#d9d9d9] text-[9px]">{initials}</span>
                ))}
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}

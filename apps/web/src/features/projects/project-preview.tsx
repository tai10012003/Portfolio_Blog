export function ProjectPreview({ variant }: { variant: string }) {
  return (
    <div className={`portfolio-preview preview-${variant}`} aria-hidden="true">
      <div className="preview-browser">
        <div className="preview-toolbar"><i /><i /><i /><span>{variant === "easytalk" ? "EasyTalk" : variant === "sportelite" ? "SportElite" : "Cobenfy"}</span></div>
        {variant === "easytalk" ? (
          <div className="preview-learning"><div className="preview-learning-heading"><span className="preview-brand-symbol">e.</span><div><b>Learn. Practice. Grow.</b><span className="preview-skeleton" /></div></div><div className="preview-learning-path">{[1, 2, 3].map((step) => <span key={step}>{step}</span>)}</div><div className="preview-learning-cards"><div><span>AI</span><i /><i /></div><div><span>Aa</span><i /><i /></div><div><span>✓</span><i /><i /></div></div></div>
        ) : variant === "sportelite" ? (
          <div className="preview-shop"><div className="preview-shop-heading"><b>SportElite<span>.</span></b><span>MOVE YOUR WAY</span></div><div className="preview-products">{[0, 1, 2].map((index) => <div key={index}><svg width="90" height="65" viewBox="0 0 100 70" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><path d="M15 23 30 15l15 16 19 7 23 5q7 2 7 9v7H7V43l8-20Zm-8 29h87M34 25l-8 9m16-1-7 8m17-3-5 7" /><path d="m16 24 12 10-4 9H8" /></svg><span className="preview-skeleton" /><span className="preview-skeleton short" /></div>)}</div></div>
        ) : (
          <div className="preview-analytics"><div className="preview-analytics-heading"><b>Cobenfy</b><div><i /><i /><i /></div></div><div className="preview-chart"><svg viewBox="0 0 280 88" fill="none"><path d="M0 20h280M0 44h280M0 68h280" className="preview-grid-line" /><path d="m5 70 40-16 35 7 40-31 35 10 45-25 32 9 40-18" className="preview-chart-line" /><path d="m5 79 40-9 35 4 40-17 35 8 45-19 32 4 40-15" className="preview-chart-line secondary" /></svg></div><div className="preview-table">{[1, 2, 3].map((row) => <div key={row}><i /><i /><i /></div>)}</div></div>
        )}
      </div>
    </div>
  );
}

import React, { useLayoutEffect, useRef } from 'react'

// Catmull-Rom spline converted to cubic Béziers, for a smooth line
function smoothPath(points) {
	if (points.length < 2) return ''
	let d = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`
	for (let i = 0; i < points.length - 1; i++) {
		const p0 = points[i - 1] ?? points[i]
		const p1 = points[i]
		const p2 = points[i + 1]
		const p3 = points[i + 2] ?? p2
		const c1x = p1.x + (p2.x - p0.x) / 6
		const c1y = p1.y + (p2.y - p0.y) / 6
		const c2x = p2.x - (p3.x - p1.x) / 6
		const c2y = p2.y - (p3.y - p1.y) / 6
		d += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`
	}
	return d
}

/**
 * Quiet trend chart: one smooth indigo line, muted hairline grid, and a cyan
 * signal dot on the active (latest) point. Day labels render as HTML below
 * the SVG so they stay legible at any width.
 */
export default function TrendChart({ points = [], activeIndex, caption }) {
	const lineRef = useRef(null)

	// Let the line draw itself once, after the chart card has risen in.
	// useLayoutEffect runs before paint, so it starts hidden instead of
	// flashing in solid; prefers-reduced-motion skips the whole thing.
	useLayoutEffect(() => {
		const el = lineRef.current
		if (!el || typeof window === 'undefined') return
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
		const length = el.getTotalLength()
		if (!length) return
		el.style.strokeDasharray = `${length} ${length}`
		el.style.setProperty('--line-length', `${length}`)
	}, [])

	const W = 640
	const H = 220
	const padTop = 10
	const padBottom = 6
	const padLeft = 2
	const padRight = 8
	const innerW = W - padLeft - padRight
	const innerH = H - padTop - padBottom

	if (points.length === 0) return null

	const active = Math.min(activeIndex ?? points.length - 1, points.length - 1)
	const max = Math.max(...points.map((p) => p.value))
	const niceMax = Math.max(10, Math.ceil(max / 5) * 5)
	const step = Math.max(1, points.length - 1)

	const coords = points.map((p, i) => ({
		x: padLeft + (innerW * i) / step,
		y: padTop + innerH * (1 - p.value / niceMax),
	}))

	const line = smoothPath(coords)
	const last = coords[coords.length - 1]
	const area = `${line} L ${last.x.toFixed(2)} ${H - padBottom} L ${padLeft} ${H - padBottom} Z`
	const gridYs = [0, 1, 2].map((i) => padTop + (innerH * i) / 2)

	return (
		<div>
			<svg
				viewBox={`0 0 ${W} ${H}`}
				className="w-full h-auto"
				role="img"
				aria-label={caption ?? 'Trend of recent days'}
			>
				{gridYs.map((y) => (
					<line
						key={y}
						x1={padLeft}
						x2={W - padRight}
						y1={y}
						y2={y}
						strokeWidth={1}
						className="stroke-g-200 dark:stroke-g-700"
					/>
				))}
				<path d={area} className="fill-primary/10" />
				<path
					ref={lineRef}
					d={line}
					fill="none"
					strokeWidth={2}
					strokeLinecap="round"
					strokeLinejoin="round"
					className="chart-line-draw stroke-primary"
				/>
				<circle
					cx={coords[active].x}
					cy={coords[active].y}
					r={9}
					className="fill-accent/15"
				/>
				<circle cx={coords[active].x} cy={coords[active].y} r={3.5} className="fill-accent" />
			</svg>
			<div className="mt-2 flex justify-between font-mono text-[11px] text-g-500 dark:text-g-500 tabular-nums">
				{points.map((p, i) => (
					<span
						key={`${p.label}-${i}`}
						className={i === active ? 'text-g-700 dark:text-g-300' : undefined}
					>
						{p.label}
					</span>
				))}
			</div>
		</div>
	)
}

import type { LucideIcon } from 'lucide-react'
import { CheckCircle2, CloudUpload, FolderDown, Image as ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

/** Cubic bezier between two percent-space points, curved toward vertical. */
function verticalFlowPath(x1: number, y1: number, x2: number, y2: number) {
  const midY = (y1 + y2) / 2
  return `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`
}

/** A small icon badge placed at a percent-space position within a diagram. */
function DiagramNode({
  icon: Icon,
  x,
  y,
  active,
  size = 'sm',
}: {
  icon: LucideIcon
  x: number
  y: number
  active: boolean
  size?: 'sm' | 'lg'
}) {
  return (
    <div
      className={cn(
        'absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg border backdrop-blur-sm transition-all duration-500',
        size === 'lg' ? 'h-9 w-9' : 'h-7 w-7',
        active
          ? 'border-primary/40 bg-primary/15 scale-105'
          : 'border-border bg-card/70'
      )}
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <Icon
        className={cn(
          size === 'lg' ? 'h-4 w-4' : 'h-3.5 w-3.5',
          'transition-colors duration-500',
          active ? 'text-primary' : 'text-foreground/40'
        )}
        strokeWidth={2}
      />
    </div>
  )
}

/** Upload step: photos flowing up into a cloud target. */
export function UploadDiagram({ active }: { active: boolean }) {
  const photos = [
    { id: 'p1', x: 28, y: 54 },
    { id: 'p2', x: 50, y: 58 },
    { id: 'p3', x: 72, y: 54 },
  ]
  const hub = { x: 50, y: 15 }
  const paths = photos.map((p) => ({ id: p.id, d: verticalFlowPath(p.x, p.y, hub.x, hub.y) }))

  return (
    <div className="pointer-events-none absolute inset-0">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        <g className={cn('transition-colors duration-700', active ? 'text-primary/45' : 'text-foreground/10')}>
          {paths.map((p) => (
            <path key={p.id} d={p.d} stroke="currentColor" strokeWidth={0.5} fill="none" vectorEffect="non-scaling-stroke" />
          ))}
        </g>
        {active && (
          <g className="text-primary">
            {paths.map((p, i) => (
              <circle key={p.id} r={0.9} fill="currentColor">
                <animateMotion dur="1.8s" begin={`${i * 0.2}s`} repeatCount="indefinite" path={p.d} />
              </circle>
            ))}
          </g>
        )}
      </svg>

      {photos.map((p) => (
        <DiagramNode key={p.id} icon={ImageIcon} x={p.x} y={p.y} active={active} />
      ))}
      <DiagramNode icon={CloudUpload} x={hub.x} y={hub.y} active={active} size="lg" />
    </div>
  )
}

/** AI Analysis step: a slender human face with real features, scanned by a landmark mesh. */
export function AnalysisDiagram({ active }: { active: boolean }) {
  // Bounding box the face, scan brackets and scan line are all anchored to.
  const head = { x1: 41, y1: 12, x2: 59, y2: 55 }

  // Slender head + jaw silhouette: rounded crown narrowing to a rounded chin.
  const facePath =
    'M50,12 C57,12 60,20 60,28 C60,42 55,55 50,55 C45,55 40,42 40,28 C40,20 43,12 50,12 Z'

  // Small L-shaped viewfinder brackets at each corner, like a camera scan frame.
  const bracket = 4
  const corners = [
    { id: 'tl', x: head.x1 - 3, y: head.y1 - 3, dx: bracket, dy: bracket },
    { id: 'tr', x: head.x2 + 3, y: head.y1 - 3, dx: -bracket, dy: bracket },
    { id: 'bl', x: head.x1 - 3, y: head.y2 + 3, dx: bracket, dy: -bracket },
    { id: 'br', x: head.x2 + 3, y: head.y2 + 3, dx: -bracket, dy: -bracket },
  ]

  const landmarks = [
    { id: 'l-eye', x: 45.5, y: 26 },
    { id: 'r-eye', x: 54.5, y: 26 },
    { id: 'nose', x: 50, y: 34 },
    { id: 'l-mouth', x: 46.5, y: 43 },
    { id: 'r-mouth', x: 53.5, y: 43 },
  ]
  const mesh: Array<[string, string]> = [
    ['l-eye', 'r-eye'],
    ['l-eye', 'nose'],
    ['r-eye', 'nose'],
    ['nose', 'l-mouth'],
    ['nose', 'r-mouth'],
    ['l-mouth', 'r-mouth'],
    ['l-eye', 'l-mouth'],
    ['r-eye', 'r-mouth'],
  ]
  const byId = Object.fromEntries(landmarks.map((l) => [l.id, l]))

  return (
    <div className="pointer-events-none absolute inset-0">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        {/* Face silhouette */}
        <path
          d={facePath}
          fill="none"
          className={cn('transition-colors duration-700', active ? 'text-primary/45' : 'text-foreground/15')}
          stroke="currentColor"
          strokeWidth={0.6}
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />

        {/* Eyes, nose and mouth */}
        <g className={cn('transition-colors duration-700', active ? 'text-primary/60' : 'text-foreground/20')}>
          <ellipse cx={45.5} cy={26} rx={2.4} ry={1.2} fill="none" stroke="currentColor" strokeWidth={0.45} vectorEffect="non-scaling-stroke" />
          <ellipse cx={54.5} cy={26} rx={2.4} ry={1.2} fill="none" stroke="currentColor" strokeWidth={0.45} vectorEffect="non-scaling-stroke" />
          <circle cx={45.5} cy={26} r={0.5} fill="currentColor" />
          <circle cx={54.5} cy={26} r={0.5} fill="currentColor" />
          <path
            d="M50,29 L49,37 C49,38 49.4,38.6 50,38.6 C50.6,38.6 51,38 51,37"
            fill="none"
            stroke="currentColor"
            strokeWidth={0.4}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M46,43 Q50,46 54,43"
            fill="none"
            stroke="currentColor"
            strokeWidth={0.55}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </g>

        {/* Scan-frame corner brackets */}
        <g className={cn('transition-colors duration-700', active ? 'text-primary/60' : 'text-foreground/15')}>
          {corners.map((c) => (
            <path
              key={c.id}
              d={`M ${c.x} ${c.y + c.dy} L ${c.x} ${c.y} L ${c.x + c.dx} ${c.y}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={0.6}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>

        {/* Facial landmark mesh */}
        <g className={cn('transition-colors duration-700', active ? 'text-primary/40' : 'text-foreground/10')}>
          {mesh.map(([a, b]) => (
            <line
              key={`${a}-${b}`}
              x1={byId[a].x}
              y1={byId[a].y}
              x2={byId[b].x}
              y2={byId[b].y}
              stroke="currentColor"
              strokeWidth={0.4}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>

        <g className={cn('transition-colors duration-700', active ? 'text-primary' : 'text-foreground/30')}>
          {landmarks.map((l) => (
            <circle key={l.id} cx={l.x} cy={l.y} r={0.9} fill="currentColor" />
          ))}
        </g>

        {active && (
          <g className="text-primary">
            {landmarks.map((l, i) => (
              <circle key={l.id} cx={l.x} cy={l.y} r={0.9} fill="none" stroke="currentColor" strokeWidth={0.4}>
                <animate attributeName="r" values="0.9;3.2;0.9" dur="2s" begin={`${i * 0.15}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" begin={`${i * 0.15}s`} repeatCount="indefinite" />
              </circle>
            ))}
          </g>
        )}
      </svg>

      {active && (
        <div
          className="absolute overflow-hidden rounded-lg"
          style={{
            left: `${head.x1}%`,
            top: `${head.y1}%`,
            width: `${head.x2 - head.x1}%`,
            height: `${head.y2 - head.y1}%`,
          }}
        >
          <div className="scan-line absolute inset-x-0 h-1/3 bg-primary/25 blur-sm" />
        </div>
      )}
    </div>
  )
}

/** Download step: matched photos converging down into a download tray. */
export function DownloadDiagram({ active }: { active: boolean }) {
  const photos = [
    { id: 'm1', x: 26, y: 16 },
    { id: 'm2', x: 50, y: 12 },
    { id: 'm3', x: 74, y: 16 },
  ]
  const hub = { x: 50, y: 54 }
  const paths = photos.map((p) => ({ id: p.id, d: verticalFlowPath(p.x, p.y, hub.x, hub.y) }))

  return (
    <div className="pointer-events-none absolute inset-0">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        <g className={cn('transition-colors duration-700', active ? 'text-primary/45' : 'text-foreground/10')}>
          {paths.map((p) => (
            <path key={p.id} d={p.d} stroke="currentColor" strokeWidth={0.5} fill="none" vectorEffect="non-scaling-stroke" />
          ))}
        </g>
        {active && (
          <g className="text-primary">
            {paths.map((p, i) => (
              <circle key={p.id} r={0.9} fill="currentColor">
                <animateMotion dur="1.8s" begin={`${i * 0.2}s`} repeatCount="indefinite" path={p.d} />
              </circle>
            ))}
          </g>
        )}
      </svg>

      {photos.map((p) => (
        <DiagramNode key={p.id} icon={ImageIcon} x={p.x} y={p.y} active={active} />
      ))}
      <DiagramNode icon={FolderDown} x={hub.x} y={hub.y} active={active} size="lg" />

      {active && (
        <span
          className="absolute flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground animate-in zoom-in-50 fade-in duration-300 fill-mode-both"
          style={{ left: `${hub.x + 5}%`, top: `${hub.y - 5}%`, animationDelay: '900ms' }}
        >
          <CheckCircle2 className="h-3 w-3" />
        </span>
      )}
    </div>
  )
}

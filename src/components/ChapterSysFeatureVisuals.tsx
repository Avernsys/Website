"use client";

import { motion } from "framer-motion";

/* ── Discovery: Interactive map with business pins ─────── */
export function DiscoveryVisual() {
  const center = { x: 145, y: 100 };
  const searchRadius = 95;

  const businesses = [
    { x: 85, y: 45, label: "Doctor" },
    { x: 120, y: 50, label: "Lawyer" },
    { x: 200, y: 38, label: "Accountant" },
    { x: 80, y: 95 },
    { x: 160, y: 82 },
    { x: 240, y: 90 },
    { x: 60, y: 145 },
    { x: 130, y: 135 },
    { x: 210, y: 128 },
    { x: 75, y: 58 },
    { x: 180, y: 115 },
    { x: 250, y: 52 },
    { x: 35, y: 108 },
    { x: 110, y: 165 },
    { x: 225, y: 160 },
    { x: 150, y: 42 },
    { x: 95, y: 125 },
    { x: 260, y: 138 },
  ];

  return (
    <div className="relative aspect-square max-w-[480px] mx-auto rounded-3xl glass overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.06] to-transparent" />

      <svg
        viewBox="0 0 290 200"
        className="w-[90%] h-[70%]"
        fill="none"
      >
        {/* Faint map grid */}
        {Array.from({ length: 9 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1="5"
            y1={i * 25 + 10}
            x2="285"
            y2={i * 25 + 10}
            stroke="rgba(255,255,255,0.03)"
            strokeWidth="0.5"
          />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={i * 30 + 10}
            y1="5"
            x2={i * 30 + 10}
            y2="195"
            stroke="rgba(255,255,255,0.03)"
            strokeWidth="0.5"
          />
        ))}

        {/* Search radius */}
        <motion.circle
          cx={center.x}
          cy={center.y}
          r={searchRadius}
          fill="rgba(245,180,100,0.02)"
          stroke="rgba(245,180,100,0.1)"
          strokeWidth="1"
          strokeDasharray="4 4"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: 1.5,
            duration: 1.0,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        {/* Business pins */}
        {businesses.map((b, i) => {
          const dist = Math.sqrt(
            (b.x - center.x) ** 2 + (b.y - center.y) ** 2
          );
          const inRadius = dist <= searchRadius;
          return (
            <g key={`biz-${i}`}>
              <motion.circle
                cx={b.x}
                cy={b.y}
                r="7"
                fill={
                  inRadius
                    ? "rgba(245,180,100,0.15)"
                    : "rgba(255,255,255,0.03)"
                }
                stroke={
                  inRadius
                    ? "rgba(245,180,100,0.4)"
                    : "rgba(255,255,255,0.08)"
                }
                strokeWidth="0.8"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.3 + i * 0.06,
                  duration: 0.3,
                }}
              />
              <motion.circle
                cx={b.x}
                cy={b.y}
                r="2.5"
                fill={
                  inRadius
                    ? "rgba(245,180,100,0.6)"
                    : "rgba(255,255,255,0.1)"
                }
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.3 + i * 0.06,
                  duration: 0.25,
                }}
              />
              {b.label && inRadius && (
                <motion.text
                  x={b.x}
                  y={b.y - 10}
                  textAnchor="middle"
                  fill="rgba(245,180,100,0.6)"
                  fontSize="6"
                  fontFamily="var(--font-sans)"
                  fontWeight="500"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 2.5 + i * 0.08,
                    duration: 0.4,
                  }}
                >
                  {b.label}
                </motion.text>
              )}
            </g>
          );
        })}

        {/* User position */}
        <motion.circle
          cx={center.x}
          cy={center.y}
          r="4"
          fill="rgba(245,180,100,0.8)"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.3 }}
        />
        <motion.circle
          cx={center.x}
          cy={center.y}
          r="8"
          fill="none"
          stroke="rgba(245,180,100,0.3)"
          strokeWidth="1.5"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.3 }}
        />

        {/* Connection path to nearest pin */}
        <motion.path
          d={`M${center.x},${center.y} Q${center.x - 30},${center.y - 40} ${businesses[1].x},${businesses[1].y}`}
          stroke="rgba(245,180,100,0.25)"
          strokeWidth="1"
          strokeDasharray="4 3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: 3.0,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </svg>
    </div>
  );
}

/* ── Community: Chat interface with flowing messages ───── */
export function CommunityHubVisual() {
  const messages = [
    { x: 40, y: 30, width: 90, fromLeft: true, delay: 0.5 },
    { x: 155, y: 58, width: 80, fromLeft: false, delay: 1.0 },
    { x: 40, y: 86, width: 110, fromLeft: true, delay: 1.5 },
    { x: 140, y: 114, width: 95, fromLeft: false, delay: 2.0 },
  ];


  return (
    <div className="relative aspect-square max-w-[480px] mx-auto rounded-3xl glass overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.06] to-transparent" />

      <svg
        viewBox="0 0 290 200"
        className="w-[90%] h-[70%]"
        fill="none"
      >
        {/* Message bubbles */}
        {messages.map((msg, i) => (
          <motion.g
            key={`msg-${i}`}
            initial={{ opacity: 0, x: msg.fromLeft ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: msg.delay,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <rect
              x={msg.x}
              y={msg.y}
              width={msg.width}
              height="22"
              rx="8"
              fill={
                msg.fromLeft
                  ? "rgba(245,180,100,0.08)"
                  : "rgba(255,255,255,0.04)"
              }
              stroke={
                msg.fromLeft
                  ? "rgba(245,180,100,0.15)"
                  : "rgba(255,255,255,0.06)"
              }
              strokeWidth="0.5"
            />
            {/* Text placeholder lines */}
            <rect
              x={msg.x + 10}
              y={msg.y + 7}
              width={msg.width * 0.6}
              height="2.5"
              rx="1"
              fill={
                msg.fromLeft
                  ? "rgba(245,180,100,0.2)"
                  : "rgba(255,255,255,0.08)"
              }
            />
            <rect
              x={msg.x + 10}
              y={msg.y + 13}
              width={msg.width * 0.35}
              height="2.5"
              rx="1"
              fill={
                msg.fromLeft
                  ? "rgba(245,180,100,0.12)"
                  : "rgba(255,255,255,0.05)"
              }
            />
          </motion.g>
        ))}

        {/* Typing indicator */}
        <motion.g
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 2.8, duration: 0.3 }}
        >
          <rect
            x="40"
            y="145"
            width="45"
            height="16"
            rx="6"
            fill="rgba(245,180,100,0.06)"
            stroke="rgba(245,180,100,0.1)"
            strokeWidth="0.5"
          />
          {[0, 1, 2].map((d) => (
            <motion.circle
              key={`dot-${d}`}
              cx={54 + d * 8}
              cy="153"
              r="2"
              fill="rgba(245,180,100,0.3)"
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{
                delay: 3.0 + d * 0.2,
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.g>

        
      </svg>
    </div>
  );
}

/* ── Events: Minimal calendar with highlights ──────────── */
export function EventsVisual() {
  const cols = 7;
  const rows = 5;
  const cellW = 30;
  const cellH = 24;
  const startX = 30;
  const startY = 28;

  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const eventCells = [3, 7, 10, 14, 15, 19, 22, 25, 29];
  const expandedCell = 10;

  return (
    <div className="relative aspect-square max-w-[480px] mx-auto rounded-3xl glass overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.06] to-transparent" />

      <svg
        viewBox="0 0 290 200"
        className="w-[90%] h-[70%]"
        fill="none"
      >
        {/* Day column headers */}
        {days.map((day, i) => (
          <motion.text
            key={`day-${i}`}
            x={startX + i * cellW + cellW / 2}
            y={startY - 8}
            textAnchor="middle"
            fill="rgba(255,255,255,0.15)"
            fontSize="7"
            fontFamily="var(--font-sans)"
            fontWeight="500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.05, duration: 0.3 }}
          >
            {day}
          </motion.text>
        ))}

        {/* Calendar cells */}
        {Array.from({ length: rows * cols }).map((_, idx) => {
          const row = Math.floor(idx / cols);
          const col = idx % cols;
          const isEvent = eventCells.includes(idx);
          const x = startX + col * cellW;
          const y = startY + row * cellH;

          return (
            <g key={`cell-${idx}`}>
              <motion.rect
                x={x}
                y={y}
                width={cellW}
                height={cellH}
                rx="3"
                fill="transparent"
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="0.5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.3 + idx * 0.012,
                  duration: 0.3,
                }}
              />
              {isEvent && (
                <motion.rect
                  x={x + 2}
                  y={y + 2}
                  width={cellW - 4}
                  height={cellH - 4}
                  rx="2"
                  fill="rgba(245,180,100,0.1)"
                  stroke="rgba(245,180,100,0.2)"
                  strokeWidth="0.5"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay:
                      1.0 + eventCells.indexOf(idx) * 0.12,
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              )}
              {idx < 31 && (
                <motion.text
                  x={x + cellW / 2}
                  y={y + cellH / 2 + 3}
                  textAnchor="middle"
                  fill={
                    isEvent
                      ? "rgba(245,180,100,0.6)"
                      : "rgba(255,255,255,0.1)"
                  }
                  fontSize="7"
                  fontFamily="var(--font-sans)"
                  fontWeight={isEvent ? "600" : "400"}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.5 + idx * 0.012,
                    duration: 0.2,
                  }}
                >
                  {idx + 1}
                </motion.text>
              )}
            </g>
          );
        })}

        {/* Expanded event popup */}
        {(() => {
          const row = Math.floor(expandedCell / cols);
          const col = expandedCell % cols;
          const x = startX + col * cellW;
          const y = startY + row * cellH;
          return (
            <motion.g
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 2.5,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <rect
                x={x - 10}
                y={y + cellH + 4}
                width="60"
                height="30"
                rx="5"
                fill="rgba(245,180,100,0.1)"
                stroke="rgba(245,180,100,0.25)"
                strokeWidth="0.5"
              />
              <rect
                x={x - 4}
                y={y + cellH + 10}
                width="32"
                height="3"
                rx="1"
                fill="rgba(245,180,100,0.3)"
              />
              <rect
                x={x - 4}
                y={y + cellH + 16}
                width="18"
                height="2"
                rx="1"
                fill="rgba(245,180,100,0.15)"
              />
              {[0, 1, 2, 3, 4].map((d) => (
                <motion.circle
                  key={`rsvp-${d}`}
                  cx={x - 4 + d * 6}
                  cy={y + cellH + 27}
                  r="2"
                  fill="rgba(120,200,140,0.4)"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 3.0 + d * 0.1,
                    duration: 0.2,
                  }}
                />
              ))}
            </motion.g>
          );
        })()}

        {/* Multi-day connector between cells 14 and 15 */}
        {(() => {
          const r1 = Math.floor(14 / cols);
          const c1 = 14 % cols;
          const r2 = Math.floor(15 / cols);
          const c2 = 15 % cols;
          return (
            <motion.line
              x1={startX + c1 * cellW + cellW / 2}
              y1={startY + r1 * cellH + cellH / 2}
              x2={startX + c2 * cellW + cellW / 2}
              y2={startY + r2 * cellH + cellH / 2}
              stroke="rgba(245,180,100,0.25)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 2.0, duration: 0.5 }}
            />
          );
        })()}
      </svg>
    </div>
  );
}

/* ── Business Profiles: Card assembling piece by piece ─── */
export function ProfileVisual() {
  const connectedNodes = [
    { x: 80, y: 170 },
    { x: 160, y: 170 },
    { x: 90, y: 200 },
    { x: 150, y: 200 },
  ];
  const centerNode = { x: 120, y: 185 };

  return (
    <div className="relative aspect-square max-w-[480px] mx-auto rounded-3xl glass overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.06] to-transparent" />

      <svg
        viewBox="0 0 240 260"
        className="w-[70%] h-[80%]"
        fill="none"
      >
        {/* Card outline */}
        <motion.rect
          x="20"
          y="10"
          width="200"
          height="240"
          rx="16"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
          fill="rgba(255,255,255,0.02)"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        {/* Avatar circle */}
        <motion.circle
          cx="120"
          cy="55"
          r="25"
          fill="rgba(245,180,100,0.1)"
          stroke="rgba(245,180,100,0.3)"
          strokeWidth="1"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.8,
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
        {/* Avatar head */}
        <motion.circle
          cx="120"
          cy="48"
          r="8"
          fill="rgba(245,180,100,0.2)"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.0, duration: 0.3 }}
        />
        {/* Avatar body */}
        <motion.rect
          x="108"
          y="60"
          width="24"
          height="8"
          rx="4"
          fill="rgba(245,180,100,0.15)"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.0, duration: 0.3 }}
        />

        {/* Name bar */}
        <motion.rect
          x="72"
          y="95"
          width="96"
          height="6"
          rx="3"
          fill="rgba(255,255,255,0.12)"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: 1.2,
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ transformOrigin: "72px 98px" }}
        />
        {/* Subtitle bar */}
        <motion.rect
          x="88"
          y="107"
          width="64"
          height="4"
          rx="2"
          fill="rgba(255,255,255,0.06)"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: 1.4,
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ transformOrigin: "88px 109px" }}
        />

        {/* Skill tag pills */}
        {[
          { x: 48, width: 40 },
          { x: 94, width: 52 },
          { x: 152, width: 36 },
        ].map((tag, i) => (
          <motion.rect
            key={`tag-${i}`}
            x={tag.x}
            y="125"
            width={tag.width}
            height="14"
            rx="7"
            fill="rgba(245,180,100,0.06)"
            stroke="rgba(245,180,100,0.15)"
            strokeWidth="0.5"
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: 1.6 + i * 0.15,
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}

        {/* Mini connection graph */}
        {connectedNodes.map((n, i) => (
          <motion.line
            key={`conn-${i}`}
            x1={centerNode.x}
            y1={centerNode.y}
            x2={n.x}
            y2={n.y}
            stroke="rgba(245,180,100,0.12)"
            strokeWidth="0.8"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 2.2 + i * 0.1,
              duration: 0.3,
            }}
          />
        ))}
        <motion.circle
          cx={centerNode.x}
          cy={centerNode.y}
          r="6"
          fill="rgba(245,180,100,0.15)"
          stroke="rgba(245,180,100,0.3)"
          strokeWidth="0.8"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 2.0, duration: 0.3 }}
        />
        {connectedNodes.map((n, i) => (
          <motion.circle
            key={`cnode-${i}`}
            cx={n.x}
            cy={n.y}
            r="4"
            fill="rgba(245,180,100,0.08)"
            stroke="rgba(245,180,100,0.2)"
            strokeWidth="0.5"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 2.4 + i * 0.1,
              duration: 0.25,
            }}
          />
        ))}

        {/* Verified badge */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: 3.0,
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <circle
            cx="155"
            cy="37"
            r="8"
            fill="rgba(245,180,100,0.2)"
            stroke="rgba(245,180,100,0.5)"
            strokeWidth="1"
          />
          <path
            d="M151,37 L154,40 L159,34"
            stroke="rgba(245,180,100,0.8)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </motion.g>

        {/* Stats row at bottom */}
        <motion.g
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 2.8, duration: 0.4 }}
        >
          <text
            x="65"
            y="230"
            textAnchor="middle"
            fill="rgba(245,180,100,0.4)"
            fontSize="8"
            fontFamily="var(--font-sans)"
            fontWeight="600"
          >
            4
          </text>
          <text
            x="65"
            y="240"
            textAnchor="middle"
            fill="rgba(255,255,255,0.15)"
            fontSize="5.5"
            fontFamily="var(--font-sans)"
            fontWeight="400"
          >
            connections
          </text>
          <text
            x="120"
            y="230"
            textAnchor="middle"
            fill="rgba(245,180,100,0.4)"
            fontSize="8"
            fontFamily="var(--font-sans)"
            fontWeight="600"
          >
            3
          </text>
          <text
            x="120"
            y="240"
            textAnchor="middle"
            fill="rgba(255,255,255,0.15)"
            fontSize="5.5"
            fontFamily="var(--font-sans)"
            fontWeight="400"
          >
            skills
          </text>
          <text
            x="175"
            y="230"
            textAnchor="middle"
            fill="rgba(245,180,100,0.4)"
            fontSize="8"
            fontFamily="var(--font-sans)"
            fontWeight="600"
          >
            ✓
          </text>
          <text
            x="175"
            y="240"
            textAnchor="middle"
            fill="rgba(255,255,255,0.15)"
            fontSize="5.5"
            fontFamily="var(--font-sans)"
            fontWeight="400"
          >
            verified
          </text>
        </motion.g>
      </svg>
    </div>
  );
}

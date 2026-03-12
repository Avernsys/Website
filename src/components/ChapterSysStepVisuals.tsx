"use client";

import { motion } from "framer-motion";

/* ── Step 1: Organization hub forming with chapters ── */
export function CreateVisual() {
  const center = { x: 50, y: 40 };
  const satellites = [
    { x: 50, y: 12, label: "A" },
    { x: 74, y: 26, label: "B" },
    { x: 74, y: 54, label: "C" },
    { x: 50, y: 68, label: "D" },
    { x: 26, y: 54, label: "E" },
    { x: 26, y: 26, label: "F" },
  ];

  return (
    <svg viewBox="0 0 100 80" className="w-full h-24 mb-4" fill="none">
      {/* Central hub */}
      <motion.circle
        cx={center.x}
        cy={center.y}
        r="10"
        fill="rgba(245,180,100,0.08)"
        stroke="rgba(245,180,100,0.4)"
        strokeWidth="0.8"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{
          delay: 0.2,
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
      <motion.text
        x={center.x}
        y={center.y + 2.5}
        textAnchor="middle"
        fill="rgba(245,180,100,0.7)"
        fontSize="5"
        fontFamily="var(--font-sans)"
        fontWeight="700"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        ORG
      </motion.text>

      {/* Connection lines from hub to satellites */}
      {satellites.map((sat, i) => (
        <motion.line
          key={`line-${i}`}
          x1={center.x}
          y1={center.y}
          x2={sat.x}
          y2={sat.y}
          stroke="rgba(245,180,100,0.15)"
          strokeWidth="0.6"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
        />
      ))}

      {/* Satellite chapter nodes */}
      {satellites.map((sat, i) => (
        <g key={`sat-${i}`}>
          <motion.circle
            cx={sat.x}
            cy={sat.y}
            r="5"
            fill="rgba(245,180,100,0.06)"
            stroke="rgba(245,180,100,0.3)"
            strokeWidth="0.5"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.8 + i * 0.1,
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
          <motion.text
            x={sat.x}
            y={sat.y + 1.5}
            textAnchor="middle"
            fill="rgba(245,180,100,0.5)"
            fontSize="3.5"
            fontFamily="var(--font-sans)"
            fontWeight="600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.0 + i * 0.1, duration: 0.2 }}
          >
            {sat.label}
          </motion.text>
        </g>
      ))}

      {/* Outer dashed ring */}
      <motion.circle
        cx={center.x}
        cy={center.y}
        r="33"
        stroke="rgba(245,180,100,0.06)"
        strokeWidth="0.5"
        strokeDasharray="3 3"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.5, duration: 0.5 }}
      />
    </svg>
  );
}

/* ── Step 2: Members joining the network ── */
export function InviteVisual() {
  const hub = { x: 50, y: 40 };
  const incoming = [
    { x: 15, y: 15, delay: 0.3 },
    { x: 85, y: 12, delay: 0.5 },
    { x: 8, y: 55, delay: 0.7 },
    { x: 92, y: 50, delay: 0.9 },
    { x: 30, y: 8, delay: 1.1 },
    { x: 72, y: 68, delay: 1.3 },
    { x: 20, y: 70, delay: 1.5 },
    { x: 80, y: 28, delay: 1.7 },
  ];

  return (
    <svg viewBox="0 0 100 80" className="w-full h-24 mb-4" fill="none">
      {/* Central hub */}
      <motion.circle
        cx={hub.x}
        cy={hub.y}
        r="6"
        fill="rgba(245,180,100,0.1)"
        stroke="rgba(245,180,100,0.3)"
        strokeWidth="0.6"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.3 }}
      />

      {/* Lines from members to hub + member dots */}
      {incoming.map((m, i) => (
        <g key={`m-${i}`}>
          <motion.line
            x1={m.x}
            y1={m.y}
            x2={hub.x}
            y2={hub.y}
            stroke="rgba(245,180,100,0.1)"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: m.delay, duration: 0.4 }}
          />
          <motion.circle
            cx={m.x}
            cy={m.y}
            r="2"
            fill="rgba(245,180,100,0.4)"
            stroke="rgba(245,180,100,0.2)"
            strokeWidth="0.4"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: m.delay + 0.3,
              duration: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </g>
      ))}

      {/* Hub pulse */}
      <motion.circle
        cx={hub.x}
        cy={hub.y}
        r="12"
        fill="none"
        stroke="rgba(245,180,100,0.15)"
        strokeWidth="0.5"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: [0, 1.5], opacity: [0.5, 0] }}
        viewport={{ once: true }}
        transition={{
          delay: 2.2,
          duration: 1,
          repeat: Infinity,
          repeatDelay: 2.5,
        }}
      />

      {/* Member count label */}
      <motion.text
        x="92"
        y="10"
        textAnchor="end"
        fill="rgba(245,180,100,0.25)"
        fontSize="3.5"
        fontFamily="var(--font-sans)"
        fontWeight="600"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 2.5, duration: 0.5 }}
      >
        128 members
      </motion.text>
    </svg>
  );
}

/* ── Step 3: Thriving community network ── */
export function CommunityVisual() {
  const nodes = [
    { x: 15, y: 12 },
    { x: 35, y: 8 },
    { x: 55, y: 14 },
    { x: 75, y: 10 },
    { x: 90, y: 18 },
    { x: 10, y: 30 },
    { x: 28, y: 28 },
    { x: 48, y: 32 },
    { x: 65, y: 26 },
    { x: 85, y: 34 },
    { x: 18, y: 48 },
    { x: 38, y: 44 },
    { x: 50, y: 50 },
    { x: 68, y: 46 },
    { x: 82, y: 52 },
    { x: 12, y: 65 },
    { x: 32, y: 62 },
    { x: 55, y: 68 },
    { x: 72, y: 64 },
    { x: 88, y: 70 },
  ];

  const edges: [number, number][] = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [5, 6],
    [6, 7],
    [7, 8],
    [8, 9],
    [10, 11],
    [11, 12],
    [12, 13],
    [13, 14],
    [15, 16],
    [16, 17],
    [17, 18],
    [18, 19],
    [0, 5],
    [1, 6],
    [2, 7],
    [3, 8],
    [4, 9],
    [5, 10],
    [6, 11],
    [7, 12],
    [8, 13],
    [9, 14],
    [10, 15],
    [11, 16],
    [12, 17],
    [13, 18],
    [14, 19],
    [0, 6],
    [2, 8],
    [6, 12],
    [8, 14],
    [12, 18],
  ];

  const activityNodes = [1, 8, 12, 15];

  return (
    <svg viewBox="0 0 100 80" className="w-full h-24 mb-4" fill="none">
      {/* Connection mesh */}
      {edges.map(([a, b], i) => (
        <motion.line
          key={`edge-${i}`}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="rgba(245,180,100,0.08)"
          strokeWidth="0.4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + i * 0.02, duration: 0.3 }}
        />
      ))}

      {/* Network nodes */}
      {nodes.map((n, i) => (
        <motion.circle
          key={`node-${i}`}
          cx={n.x}
          cy={n.y}
          r={i % 5 === 2 ? 2.2 : 1.5}
          fill={
            i % 3 === 0
              ? "rgba(245,180,100,0.5)"
              : "rgba(245,180,100,0.3)"
          }
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + i * 0.04, duration: 0.25 }}
        />
      ))}

      {/* Activity pulses on select nodes */}
      {activityNodes.map((idx, i) => (
        <motion.circle
          key={`act-${i}`}
          cx={nodes[idx].x}
          cy={nodes[idx].y}
          r="4"
          fill="none"
          stroke="rgba(245,180,100,0.2)"
          strokeWidth="0.4"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: [0, 1.8], opacity: [0.5, 0] }}
          viewport={{ once: true }}
          transition={{
            delay: 1.5 + i * 0.4,
            duration: 1.2,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        />
      ))}

      {/* Heartbeat ripple from center */}
      <motion.circle
        cx="50"
        cy="40"
        r="25"
        fill="none"
        stroke="rgba(245,180,100,0.05)"
        strokeWidth="0.5"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: [0.5, 1.5], opacity: [0.3, 0] }}
        viewport={{ once: true }}
        transition={{
          delay: 2,
          duration: 2,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeOut",
        }}
      />

      {/* Stats label */}
      <motion.text
        x="92"
        y="10"
        textAnchor="end"
        fill="rgba(245,180,100,0.25)"
        fontSize="3.2"
        fontFamily="var(--font-sans)"
        fontWeight="500"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 2.5, duration: 0.5 }}
      >
        20 active · 4 groups
      </motion.text>
    </svg>
  );
}

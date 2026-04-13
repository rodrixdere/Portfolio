import { useLang } from "../useLang";
import styles from "./Toolkit.module.css";

const IconSvg = ({ children }: { children: React.ReactNode }) => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className={styles.iconSvg}
  >
    {children}
  </svg>
);

const tools = [
  {
    key: "frontend",
    category: { en: "FRONTEND & UI", es: "FRONTEND & UI" },
    items: [
      {
        name: "React",
        icon: (
          <IconSvg>
            <circle cx="12" cy="12" r="2.5" fill="currentColor" />
            <ellipse
              cx="12"
              cy="12"
              rx="10"
              ry="3.8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
            />
            <ellipse
              cx="12"
              cy="12"
              rx="10"
              ry="3.8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
              transform="rotate(60 12 12)"
            />
            <ellipse
              cx="12"
              cy="12"
              rx="10"
              ry="3.8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
              transform="rotate(120 12 12)"
            />
          </IconSvg>
        ),
      },
      {
        name: "TypeScript",
        icon: (
          <IconSvg>
            <rect
              x="2"
              y="2"
              width="20"
              height="20"
              rx="3"
              fill="currentColor"
              opacity="0.25"
            />
            <rect
              x="2"
              y="2"
              width="20"
              height="20"
              rx="3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <text
              x="4"
              y="17.5"
              fontFamily="monospace"
              fontWeight="900"
              fontSize="10"
              fill="currentColor"
            >
              TS
            </text>
          </IconSvg>
        ),
      },
      {
        name: "JavaScript",
        icon: (
          <IconSvg>
            <rect
              x="2"
              y="2"
              width="20"
              height="20"
              rx="3"
              fill="currentColor"
              opacity="0.25"
            />
            <rect
              x="2"
              y="2"
              width="20"
              height="20"
              rx="3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <text
              x="4"
              y="17.5"
              fontFamily="monospace"
              fontWeight="900"
              fontSize="10"
              fill="currentColor"
            >
              JS
            </text>
          </IconSvg>
        ),
      },
      {
        name: "HTML",
        icon: (
          <IconSvg>
            <path
              d="M3 2l1.5 17L12 21l7.5-2L21 2H3zm14.5 4H6.5l.3 3.5h10.4l-.5 5-4.2 1.2-4.2-1.2-.3-3h3l.1 1.5 1.4.4 1.4-.4.2-2.2H6.8L6.2 6h11.6l-.3 3.5z"
              fill="currentColor"
            />
          </IconSvg>
        ),
      },
      {
        name: "CSS",
        icon: (
          <IconSvg>
            <path
              d="M3 2l1.5 17L12 21l7.5-2L21 2H3zm13 4l-.3 2.5H8.8L9 10h8.3l-.7 6.5-4.6 1.3-4.6-1.3-.3-3.3H9l.2 1.8 2.8.8 2.8-.8.3-3.3H7.8L7 6h9z"
              fill="currentColor"
            />
          </IconSvg>
        ),
      },
      {
        name: "Tailwind CSS",
        icon: (
          <IconSvg>
            <path
              d="M12 6C9.33 6 7.67 7.33 7 10c1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35C13.41 11 14.73 12 17 12c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C15.59 7 14.27 6 12 6zm-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35C8.41 17 9.73 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C10.59 13 9.27 12 7 12z"
              fill="currentColor"
            />
          </IconSvg>
        ),
      },
      {
        name: "Bootstrap",
        icon: (
          <IconSvg>
            <path
              d="M5 2h14a3 3 0 013 3v14a3 3 0 01-3 3H5a3 3 0 01-3-3V5a3 3 0 013-3zm2 5v10h5.5a4 4 0 002.7-.9 3 3 0 001-2.3 2.7 2.7 0 00-.6-1.8A2.8 2.8 0 0014 11v-.1a2.5 2.5 0 001.3-2.2A2.7 2.7 0 0013.5 7H7zm2 4h3a1.5 1.5 0 010 3H9v-3zm0 5h3.5a1.5 1.5 0 010 3H9v-3z"
              fill="currentColor"
            />
          </IconSvg>
        ),
      },
      {
        name: 'GSAP',
        icon: (
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={styles.iconSvg}>
            <text x="1" y="17" fontFamily="monospace" fontWeight="900" fontSize="9" fill="currentColor">GSAP</text>
          </svg>
        )
      },
      {
        name: "Framer Motion",
        icon: (
          <IconSvg>
            <path d="M4 4h16v8H12L4 4zm0 8h8l8 8H4v-8z" fill="currentColor" />
          </IconSvg>
        ),
      },
    ],
  },
  {
    key: "backend",
    category: { en: "BACKEND & DATA", es: "BACKEND & DATOS" },
    items: [
      {
        name: "Node.js",
        icon: (
          <IconSvg>
            <path
              d="M12 2L3 7v10l9 5 9-5V7L12 2zm0 2.3l7 3.9v7.6l-7 3.9-7-3.9V8.2l7-3.9z"
              fill="currentColor"
            />
          </IconSvg>
        ),
      },
      {
        name: "Express.js",
        icon: (
          <IconSvg>
            <path
              d="M3 8h18M3 12h12M3 16h8"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />
          </IconSvg>
        ),
      },
      {
        name: "Spring Boot",
        icon: (
          <IconSvg>
            <path
              d="M20.2 7.4a9 9 0 11-12.9-3.2A9 9 0 0120.2 7.4zM6.2 3.2a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm14 1.5a1 1 0 100 2 1 1 0 000-2z"
              fill="currentColor"
            />
          </IconSvg>
        ),
      },
      {
        name: "PHP",
        icon: (
          <IconSvg>
            <ellipse
              cx="12"
              cy="12"
              rx="10"
              ry="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
            />
            <text
              x="5"
              y="16"
              fontFamily="monospace"
              fontWeight="900"
              fontSize="8"
              fill="currentColor"
            >
              PHP
            </text>
          </IconSvg>
        ),
      },
      {
        name: "JWT",
        icon: (
          <IconSvg>
            <circle
              cx="12"
              cy="12"
              r="9"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
            />
            <line
              x1="12"
              y1="3"
              x2="12"
              y2="21"
              stroke="currentColor"
              strokeWidth="1.3"
            />
            <path
              d="M9 7l3 2 3-2M9 17l3-2 3 2"
              stroke="currentColor"
              strokeWidth="1.1"
              fill="none"
              strokeLinecap="round"
            />
          </IconSvg>
        ),
      },
      {
        name: "Bcrypt",
        icon: (
          <IconSvg>
            <rect
              x="5"
              y="11"
              width="14"
              height="10"
              rx="2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
            />
            <path
              d="M8 11V7a4 4 0 018 0v4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
            />
            <circle cx="12" cy="16" r="1.5" fill="currentColor" />
          </IconSvg>
        ),
      },
      {
        name: "PostgreSQL",
        icon: (
          <IconSvg>
            <ellipse
              cx="12"
              cy="7"
              rx="8"
              ry="4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
            />
            <path
              d="M4 7v10c0 2.2 3.6 4 8 4s8-1.8 8-4V7"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
            />
            <path
              d="M4 12c0 2.2 3.6 4 8 4s8-1.8 8-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
            />
          </IconSvg>
        ),
      },
      {
        name: "MySQL",
        icon: (
          <IconSvg>
            <ellipse
              cx="12"
              cy="6"
              rx="8"
              ry="3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
            />
            <path
              d="M4 6v5c0 1.9 3.6 3.5 8 3.5s8-1.6 8-3.5V6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
            />
            <path
              d="M4 11v5c0 1.9 3.6 3.5 8 3.5s8-1.6 8-3.5v-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
            />
          </IconSvg>
        ),
      },
      {
        name: "Supabase",
        icon: (
          <IconSvg>
            <path d="M13 3L4 14h8l-1 7 9-11h-8l1-7z" fill="currentColor" />
          </IconSvg>
        ),
      },
      {
        name: "MongoDB",
        icon: (
          <IconSvg>
            <path
              d="M12 2C9 2 7 6 7 10c0 3 1.5 5.5 4 7l1 5 1-5c2.5-1.5 4-4 4-7 0-4-2-8-5-8z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
            />
          </IconSvg>
        ),
      },
      {
        name: "Docker",
        icon: (
          <IconSvg>
            <rect
              x="5"
              y="9"
              width="3"
              height="3"
              rx=".5"
              fill="currentColor"
            />
            <rect
              x="9"
              y="9"
              width="3"
              height="3"
              rx=".5"
              fill="currentColor"
            />
            <rect
              x="13"
              y="9"
              width="3"
              height="3"
              rx=".5"
              fill="currentColor"
            />
            <rect
              x="9"
              y="5"
              width="3"
              height="3"
              rx=".5"
              fill="currentColor"
            />
            <path
              d="M2 13c1-4 5-4 8-3 2-2 6-2 8 0 2 0 3 1 3 3-1 3-4 4-8 4H7c-3 0-5-1-5-4z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.1"
            />
          </IconSvg>
        ),
      },
    ],
  },
  {
    key: "languages",
    category: { en: "LANGUAGES & SYSTEMS", es: "LENGUAJES & SISTEMAS" },
    items: [
      {
        name: "Java",
        icon: (
          <IconSvg>
            <path
              d="M8.5 17s-.8.5.6.6c1.7.2 2.5.2 4.4-.2 0 0 .5.3 1.2.6-4.1 1.7-9.3-.1-6.2-1zm-.5-2.3s-.9.7.5.8c1.7.2 3.1.2 5.4-.3 0 0 .3.4 1 .5-4.8 1.4-10.1.1-6.9-1zM12.2 10.6c1 1.1-.3 2.2-.3 2.2s2.4-1.3 1.3-2.8c-1-1.4-1.8-2.1 2.4-4.5 0 0-6.5 1.6-3.4 5.1zM13 2s2.2 2.2-2.1 5.6c-3.4 2.7-.8 4.2 0 5.9-2-1.8-3.4-3.4-2.5-4.8C9.8 6.8 13.9 5.7 13 2z"
              fill="currentColor"
            />
          </IconSvg>
        ),
      },
      {
        name: "C#",
        icon: (
          <IconSvg>
            <path
              d="M12 2L3 7v10l9 5 9-5V7L12 2z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
            />
            <text
              x="7.5"
              y="15.5"
              fontFamily="monospace"
              fontWeight="700"
              fontSize="8"
              fill="currentColor"
            >
              C#
            </text>
          </IconSvg>
        ),
      },
      {
        name: "C++",
        icon: (
          <IconSvg>
            <path
              d="M12 2L3 7v10l9 5 9-5V7L12 2z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
            />
            <text
              x="6"
              y="15.5"
              fontFamily="monospace"
              fontWeight="700"
              fontSize="8"
              fill="currentColor"
            >
              C++
            </text>
          </IconSvg>
        ),
      },
      {
        name: "Bash",
        icon: (
          <IconSvg>
            <rect
              x="2"
              y="3"
              width="20"
              height="18"
              rx="3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
            />
            <path
              d="M6 8l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <line
              x1="12"
              y1="16"
              x2="18"
              y2="16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </IconSvg>
        ),
      },
      {
        name: "Linux",
        icon: (
          <IconSvg>
            <path
              d="M12 2a5 5 0 014 2c1 1.5 1 3 .5 5-.5 1.5-1 3-.5 4.5.5 1.5 1 2 .5 3-.5 1-2 1.5-4.5 1.5S8 17.5 7.5 16.5c-.5-1 0-1.5.5-3s-.5-3-.5-4.5C7 7.5 7 5.5 8 4a5 5 0 014-2z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
            />
            <circle cx="10" cy="9" r="1" fill="currentColor" />
            <circle cx="14" cy="9" r="1" fill="currentColor" />
            <path
              d="M9 13.5s1 1.5 3 1.5 3-1.5 3-1.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path
              d="M8 19l-2 2M16 19l2 2"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </IconSvg>
        ),
      },
    ],
  },
  {
    key: "tools",
    category: { en: "TOOLS & ENV", es: "HERRAMIENTAS" },
    items: [
      {
        name: "Git / GitHub",
        icon: (
          <IconSvg>
            <path
              d="M21.7 11.3l-9-9a1 1 0 00-1.4 0l-2 2 2.5 2.5a1.2 1.2 0 011.5 1.5l2.4 2.4a1.2 1.2 0 011.1 2 1.2 1.2 0 01-1.2 1.2 1.2 1.2 0 01-1.2-1.2c0-.2 0-.4.1-.5L13 9.7v5.1a1.2 1.2 0 01.8 1.1A1.2 1.2 0 1112.6 15h-.1a1.2 1.2 0 01-1-1.2V9.6a1.2 1.2 0 01-.7-1.5L8.4 5.6l-6 6a1 1 0 000 1.4l9 9a1 1 0 001.4 0l8.9-8.9a1 1 0 000-1.8z"
              fill="currentColor"
            />
          </IconSvg>
        ),
      },
      {
        name: "VS Code",
        icon: (
          <IconSvg>
            <path
              d="M17 2L7 13 3 10l-1 1 4.5 4L3 19l1 1 3.5-3L17 22l4-2V4l-4-2zm2 17.5L8.5 12 19 4.5v15z"
              fill="currentColor"
            />
          </IconSvg>
        ),
      },
      {
        name: "Vercel",
        icon: (
          <IconSvg>
            <path d="M12 2L2 20h20L12 2z" fill="currentColor" />
          </IconSvg>
        ),
      },
      {
        name: "Postman",
        icon: (
          <IconSvg>
            <circle
              cx="12"
              cy="12"
              r="10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
            />
            <path
              d="M8 12h8M14 9l3 3-3 3"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </IconSvg>
        ),
      },
      {
        name: "Contentful",
        icon: (
          <IconSvg>
            <circle
              cx="12"
              cy="12"
              r="10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
            />
            <path
              d="M8 12a4 4 0 004-4M8 12a4 4 0 004 4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
            />
          </IconSvg>
        ),
      },
    ],
  },
];

export default function Toolkit() {
  const { t, lang } = useLang();

  return (
    <section className={styles.toolkit} id="toolkit">
      <div className={styles.inner}>
        <span className={styles.label}>{t.toolkit.label}</span>
        <div className={styles.grid}>
          {tools.map((group) => (
            <div key={group.key} className={styles.group}>
              <h3 className={styles.groupTitle}>{group.category[lang]}</h3>
              <ul className={styles.list}>
                {group.items.map((item) => (
                  <li key={item.name} className={styles.item}>
                    <span className={styles.iconWrap}>{item.icon}</span>
                    <span className={styles.itemName}>{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

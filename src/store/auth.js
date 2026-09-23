import { create } from "zustand";
import { persist } from "zustand/middleware";

// built-in admin so /admin is always demoable → admin@neumorph.com / admin123
const SEED_ADMIN = {
  id: "seed-admin",
  username: "Admin",
  email: "admin@neumorph.com",
  password: btoa("admin123"),
  role: "admin",
  createdAt: new Date().toISOString(),
};

// never keep the password on the session object
const publicUser = (u) => ({
  id: u.id,
  username: u.username,
  email: u.email,
  role: u.role ?? "user",
  createdAt: u.createdAt,
});

export const useAuth = create(
  persist(
    (set, get) => ({
      users: [SEED_ADMIN],
      user: null,

      signUp: ({ username, email, password, role }) => {
        const { users } = get();
        if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
          return { ok: false, error: "This email is already registered. Try signing in." };
        }
        const newUser = {
          id: crypto.randomUUID(),
          username,
          email: email.toLowerCase(),
          password: btoa(password),
          role: role === "admin" ? "admin" : "user",
          createdAt: new Date().toISOString(),
        };
        set((s) => ({ users: [...s.users, newUser], user: publicUser(newUser) }));
        return { ok: true, user: publicUser(newUser) };
      },

      signIn: ({ email, password }) => {
        const { users } = get();
        const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
        if (!found) return { ok: false, error: "No account found with this email." };
        if (found.password !== btoa(password)) return { ok: false, error: "Incorrect password." };
        const session = publicUser(found);
        set({ user: session });
        return { ok: true, user: session };
      },

      signOut: () => set({ user: null }),

      updateUser: ({ username, password }) => {
        const current = get().user;
        if (!current) return { ok: false, error: "Not signed in." };
        if (password && password.length < 6) {
          return { ok: false, error: "New password must be at least 6 characters." };
        }
        set((s) => ({
          users: s.users.map((u) =>
            u.id === current.id
              ? { ...u, username: username || u.username, ...(password && { password: btoa(password) }) }
              : u
          ),
          user: { ...current, username: username || current.username },
        }));
        return { ok: true };
      },

      deleteUser: (id) => {
        if (id === get().user?.id) {
          return { ok: false, error: "You can't delete the account you're signed in with." };
        }
        set((s) => ({ users: s.users.filter((u) => u.id !== id) }));
        return { ok: true };
      },
    }),
    {
      name: "neumorph-auth", // localStorage key — one key instead of two
      partialize: (s) => ({ users: s.users, user: s.user }), // only persist data, not functions
    }
  )
);
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BriefPage from "./page";

// Mock next/link
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("BriefPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  describe("Step 1 - Contact Details", () => {
    it("renders step 1 with contact fields", () => {
      render(<BriefPage />);

      expect(screen.getByText("Kontaktuppgifter")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Ditt namn")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("din@epost.se")).toBeInTheDocument();
      expect(screen.getAllByPlaceholderText("Valfritt")).toHaveLength(2); // Company and phone
    });

    it("shows validation errors when clicking next without required fields", async () => {
      render(<BriefPage />);

      const nextButton = screen.getByText("Nästa →");
      fireEvent.click(nextButton);

      await waitFor(() => {
        expect(screen.getByText("• Namn är obligatoriskt")).toBeInTheDocument();
        expect(
          screen.getByText("• E-post är obligatoriskt")
        ).toBeInTheDocument();
      });
    });

    it("shows email validation error for invalid email", async () => {
      const user = userEvent.setup();
      render(<BriefPage />);

      await user.type(screen.getByPlaceholderText("Ditt namn"), "Test Person");
      await user.type(screen.getByPlaceholderText("din@epost.se"), "invalid");

      const nextButton = screen.getByText("Nästa →");
      fireEvent.click(nextButton);

      await waitFor(() => {
        expect(
          screen.getByText("• Ange en giltig e-postadress")
        ).toBeInTheDocument();
      });
    });

    it("proceeds to step 2 with valid input", async () => {
      const user = userEvent.setup();
      render(<BriefPage />);

      await user.type(screen.getByPlaceholderText("Ditt namn"), "Test Person");
      await user.type(
        screen.getByPlaceholderText("din@epost.se"),
        "test@example.com"
      );

      const nextButton = screen.getByText("Nästa →");
      fireEvent.click(nextButton);

      await waitFor(() => {
        expect(screen.getByText("Ditt projekt")).toBeInTheDocument();
        expect(screen.getByText("Steg 2/3")).toBeInTheDocument();
      });
    });
  });

  describe("Step 2 - Project Details", () => {
    const goToStep2 = async () => {
      const user = userEvent.setup();
      render(<BriefPage />);

      await user.type(screen.getByPlaceholderText("Ditt namn"), "Test Person");
      await user.type(
        screen.getByPlaceholderText("din@epost.se"),
        "test@example.com"
      );
      fireEvent.click(screen.getByText("Nästa →"));

      await waitFor(() => {
        expect(screen.getByText("Ditt projekt")).toBeInTheDocument();
      });

      return user;
    };

    it("renders project type checkboxes", async () => {
      await goToStep2();

      expect(screen.getByText("Ny hemsida")).toBeInTheDocument();
      expect(screen.getByText("Redesign")).toBeInTheDocument();
      expect(screen.getByText("Landningssida")).toBeInTheDocument();
    });

    it("allows selecting multiple project types", async () => {
      const user = await goToStep2();

      const nyHemsida = screen.getByText("Ny hemsida");
      const redesign = screen.getByText("Redesign");

      await user.click(nyHemsida);
      await user.click(redesign);

      // Both should be selected (have the limegreen class)
      expect(nyHemsida.closest("label")).toHaveClass("border-limegreen");
      expect(redesign.closest("label")).toHaveClass("border-limegreen");
    });

    it("shows validation error without project description", async () => {
      await goToStep2();

      const nextButton = screen.getByText("Nästa →");
      fireEvent.click(nextButton);

      await waitFor(() => {
        expect(
          screen.getByText("• Projektbeskrivning är obligatoriskt")
        ).toBeInTheDocument();
      });
    });

    it("proceeds to step 3 with valid input", async () => {
      const user = await goToStep2();

      await user.type(
        screen.getByPlaceholderText("Vad behöver du hjälp med?"),
        "Jag behöver en ny hemsida för mitt företag"
      );

      fireEvent.click(screen.getByText("Nästa →"));

      await waitFor(() => {
        expect(screen.getByText("Vilken känsla?")).toBeInTheDocument();
        expect(screen.getByText("Steg 3/3")).toBeInTheDocument();
      });
    });
  });

  describe("Step 3 - Design & Submit", () => {
    const goToStep3 = async () => {
      const user = userEvent.setup();
      render(<BriefPage />);

      // Step 1
      await user.type(screen.getByPlaceholderText("Ditt namn"), "Test Person");
      await user.type(
        screen.getByPlaceholderText("din@epost.se"),
        "test@example.com"
      );
      fireEvent.click(screen.getByText("Nästa →"));

      await waitFor(() => {
        expect(screen.getByText("Ditt projekt")).toBeInTheDocument();
      });

      // Step 2
      await user.type(
        screen.getByPlaceholderText("Vad behöver du hjälp med?"),
        "Jag behöver en ny hemsida"
      );
      fireEvent.click(screen.getByText("Nästa →"));

      await waitFor(() => {
        expect(screen.getByText("Vilken känsla?")).toBeInTheDocument();
      });

      return user;
    };

    it("renders design fields", async () => {
      await goToStep3();

      expect(
        screen.getByPlaceholderText("Modern, minimalistisk, lekfull...")
      ).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("Länka till hemsidor du gillar...")
      ).toBeInTheDocument();
    });

    it("shows tip about meeting", async () => {
      await goToStep3();

      expect(screen.getByText(/Osäker\?/)).toBeInTheDocument();
      expect(
        screen.getByText(/Vi går igenom allt på mötet/)
      ).toBeInTheDocument();
    });

    it("submits form successfully", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      });

      const user = await goToStep3();

      await user.type(
        screen.getByPlaceholderText("Modern, minimalistisk, lekfull..."),
        "Modern och clean"
      );

      fireEvent.click(screen.getByText("Skicka"));

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith("/api/send-brief", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: expect.stringContaining("Test Person"),
        });
      });

      await waitFor(() => {
        expect(
          screen.getByText("Tack för din förfrågan!")
        ).toBeInTheDocument();
      });
    });

    it("shows error message on failed submission", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: () =>
          Promise.resolve({ error: "Något gick fel med e-posttjänsten" }),
      });

      await goToStep3();

      fireEvent.click(screen.getByText("Skicka"));

      await waitFor(() => {
        expect(
          screen.getByText("Något gick fel med e-posttjänsten")
        ).toBeInTheDocument();
      });
    });
  });

  describe("Navigation", () => {
    it("can go back to previous step", async () => {
      const user = userEvent.setup();
      render(<BriefPage />);

      // Go to step 2
      await user.type(screen.getByPlaceholderText("Ditt namn"), "Test Person");
      await user.type(
        screen.getByPlaceholderText("din@epost.se"),
        "test@example.com"
      );
      fireEvent.click(screen.getByText("Nästa →"));

      await waitFor(() => {
        expect(screen.getByText("Steg 2/3")).toBeInTheDocument();
      });

      // Go back
      fireEvent.click(screen.getByText("← Tillbaka"));

      await waitFor(() => {
        expect(screen.getByText("Steg 1/3")).toBeInTheDocument();
        expect(screen.getByText("Kontaktuppgifter")).toBeInTheDocument();
      });
    });

    it("preserves form data when navigating back", async () => {
      const user = userEvent.setup();
      render(<BriefPage />);

      // Fill step 1
      await user.type(screen.getByPlaceholderText("Ditt namn"), "Test Person");
      await user.type(
        screen.getByPlaceholderText("din@epost.se"),
        "test@example.com"
      );
      fireEvent.click(screen.getByText("Nästa →"));

      await waitFor(() => {
        expect(screen.getByText("Ditt projekt")).toBeInTheDocument();
      });

      // Go back
      fireEvent.click(screen.getByText("← Tillbaka"));

      await waitFor(() => {
        expect(screen.getByPlaceholderText("Ditt namn")).toHaveValue(
          "Test Person"
        );
        expect(screen.getByPlaceholderText("din@epost.se")).toHaveValue(
          "test@example.com"
        );
      });
    });
  });

  describe("LocalStorage persistence", () => {
    it("saves form data to localStorage", async () => {
      const user = userEvent.setup();
      render(<BriefPage />);

      await user.type(screen.getByPlaceholderText("Ditt namn"), "Test Person");

      await waitFor(() => {
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
          "pixelpioneer-brief-form",
          expect.stringContaining("Test Person")
        );
      });
    });

    it("loads saved form data on mount", () => {
      const savedData = JSON.stringify({
        name: "Saved Name",
        email: "saved@example.com",
        company: "",
        phone: "",
        projectType: [],
        description: "",
        deadline: "",
        designStyle: "",
        inspirationSites: "",
      });
      localStorageMock.getItem.mockReturnValue(savedData);

      render(<BriefPage />);

      expect(screen.getByPlaceholderText("Ditt namn")).toHaveValue(
        "Saved Name"
      );
      expect(screen.getByPlaceholderText("din@epost.se")).toHaveValue(
        "saved@example.com"
      );
    });

    it("clears localStorage after successful submission", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      });

      const user = userEvent.setup();
      render(<BriefPage />);

      // Complete all steps
      await user.type(screen.getByPlaceholderText("Ditt namn"), "Test Person");
      await user.type(
        screen.getByPlaceholderText("din@epost.se"),
        "test@example.com"
      );
      fireEvent.click(screen.getByText("Nästa →"));

      await waitFor(() => {
        expect(screen.getByText("Ditt projekt")).toBeInTheDocument();
      });

      await user.type(
        screen.getByPlaceholderText("Vad behöver du hjälp med?"),
        "Test project"
      );
      fireEvent.click(screen.getByText("Nästa →"));

      await waitFor(() => {
        expect(screen.getByText("Vilken känsla?")).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText("Skicka"));

      await waitFor(() => {
        expect(localStorageMock.removeItem).toHaveBeenCalledWith(
          "pixelpioneer-brief-form"
        );
      });
    });
  });
});

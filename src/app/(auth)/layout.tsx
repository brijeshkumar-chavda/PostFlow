import { Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full relative">
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#0f172a] flex-col justify-between p-12 overflow-hidden border-r border-border-dark/30">
        <div className="absolute top-0 left-0 w-full h-full z-0 opacity-20">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-sky-500 blur-[120px]"></div>
        </div>

        <div className="relative z-10 flex items-center gap-3 text-white mb-10">
          <div className="size-8 flex items-center justify-center rounded bg-primary/20 text-primary">
            <Sparkles className="h-5 w-5 fill-current" />
          </div>
          <h2 className="text-white text-xl font-bold tracking-tight">
            PostFlow AI
          </h2>
        </div>

        <div className="relative z-10 max-w-lg mt-auto mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-[1.1] mb-6">
            Supercharge your social growth with AI.
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            Create, schedule, and analyze your LinkedIn & Instagram posts in one
            seamless workflow. Let our AI handle the engagement while you focus
            on the strategy.
          </p>
          <div className="flex gap-4 items-center">
            <div className="flex -space-x-3 rtl:space-x-reverse">
              <img
                alt="User avatar 1"
                className="w-10 h-10 border-2 border-background-dark rounded-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpFM05i70lG72YNZk6xBnFndnrxZWsaz3i_HCyOfLwMeAEZedyVi4jpYxKi4ov1akZ8KXkIFUJcBxmPIFuxShmFQvzi1qOmCo-JqXGtdrkEP9IWLi6MNb886cCLv_VQD73qpeFEfQFBosCjHlACx00YO17cPDFHblmnH44J4GtuVP1kCo3f56JaSP0sAkqx1DaHkt2DZGStdIJvEESlT4TYkYc8CNhjpdPk0Fk9Z3vfB19HxkLT_K2_fqc-BQ1wdAZEaqJoFby2nKb"
              />
              <img
                alt="User avatar 2"
                className="w-10 h-10 border-2 border-background-dark rounded-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDk5lBBNDiIuHyNRzCqAKtf77TjTTDl8DDVzYKllMjMNMpte9_hP-L-HaLwl1KhRE609onofpK75UyvaUsRWJA3njb52pXxQsBklYNSzwKWHoGjHB5qu2o9QAMhT2-axN27NRt5y3yJ0dZg-rzz-LBHkXGpXVilk6nVC49cuu9maQzw_iAkIxDZmpZUsLZvhoBSPaAbZk4RUNV9Np1mmXtlIQ0LIB2aOJFUM9Xc1KA-5TnAmY3Y2UyYEauCpuT_UIWqcZeaUIGbp6Wy"
              />
              <img
                alt="User avatar 3"
                className="w-10 h-10 border-2 border-background-dark rounded-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8MXHv3CS1y9o6sCXZofeP5GsVyHDFRGbc66tKuIfvh-m23ABZAilfT1W3VLK95QWFKHMLbvyMact7cm9BdDv8lQaK74pi8byetGPyKmWXOl91OrSo9Nncet8yhCv3LREZze-LC5OMJuGkgBZXAgjSS5E6fJvxh2ijA7Lvpxam6xyd8RBC9aaZ6Jhigpn8BRt_WNjvXjzTBfwCpiWkuPhtfMlR4-vENyr4g3UUAXXNsNi8fAyViHnnKpODup_qMMzBqdReHwqkDmgr"
              />
              <div className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-surface-dark border-2 border-background-dark rounded-full hover:bg-gray-600 dark:border-gray-800">
                +2k
              </div>
            </div>
            <span className="text-sm font-medium text-text-secondary">
              Trusted by creators worldwide
            </span>
          </div>
        </div>

        <div className="relative z-10 text-sm text-gray-400">
          © 2025 Cross Platform Post App. All rights reserved.
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 sm:p-8 md:p-12 lg:p-24 bg-white dark:bg-background-dark">
        <div className="w-full max-w-md space-y-8">{children}</div>
      </div>
    </div>
  );
}

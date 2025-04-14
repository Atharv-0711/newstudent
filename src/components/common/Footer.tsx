import React from "react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border py-6 px-6 mt-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">SurveyInsight</h3>
            <p className="text-muted-foreground text-sm">
              Empowering educators with data-driven insights to better
              understand and support their students.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/dashboard"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/students"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  Students
                </Link>
              </li>
              <li>
                <Link
                  href="/surveys"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  Surveys
                </Link>
              </li>
              <li>
                <Link
                  href="/reports"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  Reports
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Email: support@surveyinsight.edu</li>
              <li>Phone: (555) 123-4567</li>
              <li>Hours: Mon-Fri 9am-5pm EST</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-6 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} SurveyInsight. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

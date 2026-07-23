import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Mail, ShieldCheck, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const SUPPORT_EMAIL = 'support@theseahorseclub.com';

/**
 * Public, no-auth page describing how a user can request deletion of their
 * account and all associated data. This URL is submitted to the Google Play
 * Data Safety form ("Account deletion") and Apple App Store as the external
 * data-deletion contact point.
 */
export const DeleteAccountRequest: React.FC = () => {
  const subject = encodeURIComponent('Account & data deletion request');
  const body = encodeURIComponent(
    'I would like my Seahorse Club account and all associated data to be permanently deleted.\n\n' +
      'Account email: \n' +
      '(Please send this from the email address registered to your account so we can verify the request.)'
  );

  return (
    <div className="min-h-screen gradient-calm flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg space-y-6 animate-fade-in">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-1">The Seahorse Club</h1>
          <p className="text-muted-foreground text-sm">Account &amp; data deletion</p>
        </div>

        <Card variant="soft" className="p-6 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center flex-shrink-0">
              <Trash2 className="w-5 h-5 text-destructive" />
            </div>
            <h2 className="font-display font-semibold text-lg text-foreground">
              Delete your account
            </h2>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            You can permanently delete your Seahorse Club account and all data associated
            with it. There are two ways to do this.
          </p>

          {/* Option 1 — in-app */}
          <div className="space-y-2">
            <h3 className="font-medium text-foreground text-sm">1. In the app (instant)</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Open the app and go to <strong>Settings → Danger zone → Delete Account</strong>,
              then type <strong>DELETE</strong> to confirm. Your account and data are removed
              immediately.
            </p>
          </div>

          {/* Option 2 — email */}
          <div className="space-y-2">
            <h3 className="font-medium text-foreground text-sm">2. By email request</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              If you can&apos;t access the app, email us from the address registered to your
              account and we&apos;ll delete it for you within 30 days.
            </p>
            <Button asChild variant="ocean" size="lg" className="w-full">
              <a href={`mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`}>
                <Mail className="w-5 h-5 mr-2" />
                Email a deletion request
              </a>
            </Button>
          </div>
        </Card>

        {/* What gets deleted */}
        <Card variant="soft" className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <h3 className="font-medium text-foreground text-sm">What is deleted</h3>
          </div>
          <ul className="text-sm text-muted-foreground space-y-1.5 list-disc pl-5 leading-relaxed">
            <li>Your account and login credentials</li>
            <li>Child profiles and caregiver links</li>
            <li>Daily signals, sleep logs, wake windows and insights</li>
            <li>Milestone and content-view history</li>
            <li>Your subscription record in our database</li>
          </ul>

          <div className="flex items-start gap-2 pt-1">
            <Clock className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              Deletion is permanent and cannot be undone. We retain no personal data after
              deletion, except where required by law (e.g. payment records held by Apple or
              Google for tax purposes). Cancelling your subscription is handled separately in
              your App Store or Google Play account settings.
            </p>
          </div>
        </Card>

        <div className="flex gap-4 justify-center text-xs">
          <Link to="/auth" className="text-primary underline hover:text-primary/80">
            Back to sign in
          </Link>
          <span className="text-muted-foreground/40">·</span>
          <a
            href="https://theseahorseclub.com/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline hover:text-primary/80"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountRequest;

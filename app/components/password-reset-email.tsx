import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface PasswordResetEmailProps {
  resetToken?: string;
  baseUrl?: string;
}

// Get base URL from prop or environment variable or use default
const getBaseUrl = (providedBaseUrl?: string) => {
  if (providedBaseUrl) {
    return providedBaseUrl;
  }
  if (typeof process !== 'undefined' && process.env) {
    if (process.env.NEXT_PUBLIC_BASE_URL) {
      return process.env.NEXT_PUBLIC_BASE_URL;
    }
    if (process.env.NEXTAUTH_URL) {
      return process.env.NEXTAUTH_URL;
    }
  }
  // Fallback to production URL or localhost for development
  return typeof process !== 'undefined' && process.env?.NODE_ENV === 'production' 
    ? 'https://hubnet.jas.com' 
    : 'http://localhost:3000';
};

export const PasswordResetEmail = ({ resetToken, baseUrl: providedBaseUrl }: PasswordResetEmailProps) => {
  const baseUrl = getBaseUrl(providedBaseUrl);
  
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>Password reset verification code for your JAS account</Preview>
        <Container style={container}>
          
          {/* Header Section with Gradient Background */}
          <Section style={headerSection}>
            <Section style={logoContainer}>
              <Img
                src={`${baseUrl}/logojas.png`}
                width="120"
                height="96"
                alt="JAS Logo"
                style={logoJas}
              />
              <Img
                src={`${baseUrl}/cargo-hubnet-logo.png`}
                width="160"
                height="80"
                alt="Hubnet Logo"
                style={logoHubnet}
              />
            </Section>
          </Section>

        {/* Decorative Top Border */}
        <Section style={decorativeTop}></Section>

        {/* Card Content */}
        <Section style={card}>
          <Text style={title}>🔐 Reset Your Password</Text>

          <Text style={text}>
            We received a request to reset your password for your JAS account.
            Use the verification code below to proceed with resetting your password.
          </Text>

          {/* Verification Code with Colorful Design */}
          <Section style={codeWrapper}>
            <Text style={codeLabel}>Your Verification Code</Text>
            <Section style={codeBox}>
              <Text style={code}>{resetToken}</Text>
            </Section>
          </Section>

          <Section style={warningBox}>
            <Text style={note}>
              ⏰ This code will expire in <strong style={highlight}>10 minutes</strong> for security reasons.
              <br />
              <br />
              ⚠️ If you did not request a password reset, please ignore this email and contact support if you have concerns.
            </Text>
          </Section>
        </Section>

        {/* Colorful Decorative Bottom Border */}
        <Section style={decorativeBottom}></Section>

        {/* Footer */}
        <Section style={footer}>
          <Text style={footerBrand}>
            ✈️ JAS — Your trusted cargo and logistics partner
          </Text>
          <Text style={footerCopy}>
            © 2025 JAS. All rights reserved.
          </Text>
          <Section style={footerLinks}>
            <Text style={linkText}>Need help? Contact our support team</Text>
          </Section>
        </Section>
      </Container>
    </Body>
  </Html>
  );
};

PasswordResetEmail.PreviewProps = {
  resetToken: 'A1B2C3',
} as PasswordResetEmailProps;

export default PasswordResetEmail;

/* ------------------ STYLES ------------------ */

const main = {
  backgroundColor: '#f0f7ff',
  backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
  backgroundSize: '400% 400%',
  color: '#24292e',
  fontFamily:
    'Segoe UI, Helvetica, Arial, sans-serif',
  padding: '40px 0',
};

const container = {
  maxWidth: '600px',
  margin: '0 auto',
  backgroundColor: '#ffffff',
  borderRadius: '20px',
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
  overflow: 'hidden',
};

const headerSection = {
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
  textAlign: 'center' as const,
  padding: '40px 20px',
  position: 'relative' as const,
};

const logoContainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '20px',
  flexWrap: 'wrap' as const,
};

const logoJas = {
  filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))',
  marginBottom: '0',
};

const logoHubnet = {
  filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))',
  marginBottom: '0',
};

const decorativeTop = {
  height: '6px',
  background: 'linear-gradient(90deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
  backgroundSize: '200% 100%',
};

const card = {
  padding: '48px 36px',
  textAlign: 'center' as const,
  backgroundColor: '#ffffff',
};

const title = {
  fontSize: '32px',
  fontWeight: 'bold',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  marginBottom: '20px',
  lineHeight: 1.3,
};

const text = {
  fontSize: '16px',
  color: '#4a5568',
  marginBottom: '36px',
  lineHeight: 1.7,
};

const codeWrapper = {
  marginBottom: '36px',
};

const codeLabel = {
  fontSize: '14px',
  fontWeight: '600',
  color: '#764ba2',
  textTransform: 'uppercase' as const,
  letterSpacing: '1px',
  marginBottom: '12px',
};

const codeBox = {
  background: 'linear-gradient(135deg, #e0e7ff 0%, #fce7f3 50%, #dbeafe 100%)',
  border: '3px solid transparent',
  backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
  backgroundOrigin: 'border-box',
  backgroundClip: 'padding-box, border-box',
  borderRadius: '16px',
  padding: '32px 24px',
  marginBottom: '0',
  boxShadow: '0 8px 24px rgba(118, 75, 162, 0.15)',
};

const code = {
  fontSize: '42px',
  fontWeight: 'bold',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  letterSpacing: '10px',
  fontFamily: 'monospace',
  margin: '0',
  textAlign: 'center' as const,
};

const warningBox = {
  backgroundColor: '#fff7ed',
  borderLeft: '4px solid #f59e0b',
  borderRadius: '8px',
  padding: '20px',
  marginTop: '24px',
};

const note = {
  fontSize: '14px',
  color: '#78350f',
  lineHeight: 1.7,
  margin: '0',
};

const highlight = {
  color: '#dc2626',
  fontWeight: 'bold',
};

const decorativeBottom = {
  height: '6px',
  background: 'linear-gradient(90deg, #00f2fe 0%, #4facfe 25%, #f093fb 50%, #764ba2 75%, #667eea 100%)',
  backgroundSize: '200% 100%',
};

const footer = {
  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
  padding: '32px 20px',
  textAlign: 'center' as const,
  borderTop: '1px solid #e1e5e9',
};

const footerBrand = {
  fontSize: '16px',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  fontWeight: '600',
  marginBottom: '12px',
};

const footerCopy = {
  fontSize: '12px',
  color: '#64748b',
  marginBottom: '12px',
};

const footerLinks = {
  marginTop: '16px',
};

const linkText = {
  fontSize: '13px',
  color: '#667eea',
  fontWeight: '500',
  margin: '0',
};

/**
 * Configuración centralizada para plantillas de email
 */

export interface TemplateConfig {
  name: string;
  path: string;
  description: string;
  category: 'contact' | 'auth' | 'notifications' | 'shared';
  variables: string[];
}

export const EMAIL_TEMPLATES: TemplateConfig[] = [
  {
    name: 'contact-email',
    path: 'contact/contact-email',
    description: 'Email enviado cuando se recibe un mensaje de contacto',
    category: 'contact',
    variables: ['name', 'email', 'message', 'timestamp', 'year']
  }
];


export function getTemplateConfig(templateName: string): TemplateConfig | undefined {
  return EMAIL_TEMPLATES.find(template => template.name === templateName);
}


export function getTemplatesByCategory(category: TemplateConfig['category']): TemplateConfig[] {
  return EMAIL_TEMPLATES.filter(template => template.category === category);
}


export function validateTemplateContext(templateName: string, context: Record<string, any>): boolean {
  const templateConfig = getTemplateConfig(templateName);
  if (!templateConfig) {
    throw new Error(`Template '${templateName}' not found`);
  }

  const missingVariables = templateConfig.variables.filter(variable => 
    !(variable in context) || context[variable] === undefined
  );

  if (missingVariables.length > 0) {
    throw new Error(`Missing required variables for template '${templateName}': ${missingVariables.join(', ')}`);
  }

  return true;
}


export function createBaseContext(): Record<string, any> {
  const timestamp = new Date().toLocaleString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Bogota'
  });

  return {
    timestamp,
    year: new Date().getFullYear(),
    siteName: 'Miguel Holguin - Portfolio',
    siteUrl: 'https://mahg.dev'
  };
}

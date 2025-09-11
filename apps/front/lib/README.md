# Sistema de API del Frontend

Este directorio contiene toda la lógica relacionada con las llamadas a la API del backend.

## 📁 Estructura

```
lib/
├── api.ts                    # Servicio base de API
├── types/
│   └── api.ts               # Tipos TypeScript para respuestas de API
├── services/
│   └── api-endpoints.ts     # Servicios específicos por endpoint
└── README.md               # Esta documentación
```

## 🔧 Componentes Principales

### 1. Servicio Base (`api.ts`)
- Clase `ApiService` con métodos HTTP genéricos
- Instancia singleton `apiService`
- Manejo centralizado de errores
- Configuración de headers por defecto

### 2. Tipos TypeScript (`types/api.ts`)
- Interfaces para todas las respuestas de API
- Tipos para formularios y datos de entrada
- Tipos para paginación y filtros

### 3. Servicios Específicos (`services/api-endpoints.ts`)
- `contactService`: Formulario de contacto
- `postsService`: Gestión de posts (futuro)
- `projectsService`: Gestión de proyectos (futuro)
- `authService`: Autenticación (futuro)
- `notificationsService`: Notificaciones (futuro)

### 4. Hooks Personalizados (`hooks/use-api.ts`)
- `usePosts`: Para obtener lista de posts
- `usePost`: Para obtener un post específico
- `useProjects`: Para obtener lista de proyectos
- `useFeaturedProjects`: Para proyectos destacados
- `useProject`: Para obtener un proyecto específico
- `useAuth`: Para autenticación
- `useNotifications`: Para notificaciones

## 🚀 Uso Básico

### Servicio Base
```typescript
import { apiService } from '@/lib/api';

// GET request
const response = await apiService.get('/endpoint');

// POST request
const response = await apiService.post('/endpoint', data);

// PUT request
const response = await apiService.put('/endpoint', data);

// DELETE request
const response = await apiService.delete('/endpoint');
```

### Servicios Específicos
```typescript
import { contactService } from '@/lib/services/api-endpoints';

// Enviar mensaje de contacto
const response = await contactService.sendMessage({
  name: 'Juan Pérez',
  email: 'juan@example.com',
  message: 'Hola, me interesa tu trabajo'
});
```

### Hooks Personalizados
```typescript
import { useContactForm } from '@/hooks/use-contact-form';

function ContactForm() {
  const {
    formData,
    isSubmitting,
    submitSuccess,
    submitError,
    handleChange,
    handleSubmit
  } = useContactForm();

  return (
    <form onSubmit={handleSubmit}>
      {/* Formulario */}
    </form>
  );
}
```

## ⚙️ Configuración

### Variables de Entorno
Crea un archivo `.env.local` con:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Configuración de la API
El servicio base se configura automáticamente usando:
- `NEXT_PUBLIC_API_URL`: URL base del backend
- Headers por defecto: `Content-Type: application/json`

## 🔄 Flujo de Datos

1. **Componente** usa un hook personalizado (ej: `useContactForm`)
2. **Hook** utiliza un servicio específico (ej: `contactService`)
3. **Servicio** usa el servicio base (`apiService`)
4. **Servicio base** hace la petición HTTP
5. **Respuesta** se procesa y retorna al componente

## 📝 Ejemplo Completo

### 1. Crear un nuevo servicio
```typescript
// lib/services/api-endpoints.ts
export const newService = {
  async getData(): Promise<DataResponse> {
    const response = await apiService.get<DataResponse>('/new-endpoint');
    return response.data || response;
  }
};
```

### 2. Crear tipos
```typescript
// lib/types/api.ts
export interface DataResponse {
  data: any[];
  total: number;
}
```

### 3. Crear hook personalizado
```typescript
// hooks/use-api.ts
export function useNewData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await newService.getData();
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}
```

### 4. Usar en componente
```typescript
function MyComponent() {
  const { data, loading, error } = useNewData();

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return <div>{/* Renderizar data */}</div>;
}
```

## 🛠️ Mejores Prácticas

### 1. Manejo de Errores
- Siempre usar try-catch en hooks
- Mostrar mensajes de error amigables al usuario
- Loggear errores para debugging

### 2. Estados de Carga
- Mostrar indicadores de carga durante peticiones
- Deshabilitar botones durante envío
- Usar estados de loading consistentes

### 3. Validación
- Validar datos antes de enviar
- Usar tipos TypeScript para validación
- Mostrar errores de validación claros

### 4. Optimización
- Usar React.memo para componentes que reciben props de API
- Implementar cache cuando sea apropiado
- Evitar peticiones innecesarias

## 🔮 Extensibilidad

### Agregar Nuevo Endpoint
1. Agregar tipos en `types/api.ts`
2. Crear servicio en `services/api-endpoints.ts`
3. Crear hook en `hooks/use-api.ts`
4. Usar en componentes

### Agregar Autenticación
1. Implementar `authService`
2. Crear hook `useAuth`
3. Agregar middleware de autenticación
4. Proteger rutas y componentes

### Agregar Cache
1. Implementar estrategia de cache
2. Usar React Query o SWR
3. Configurar invalidación de cache
4. Optimizar rendimiento

## 🧪 Testing

### Tests Unitarios
- Probar servicios individualmente
- Mockear respuestas de API
- Validar manejo de errores

### Tests de Integración
- Probar hooks completos
- Validar flujo de datos
- Probar estados de carga y error

### Tests E2E
- Probar formularios completos
- Validar interacciones de usuario
- Probar diferentes escenarios de error

## 📚 Recursos Adicionales

- [Documentación de Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

// Void Nebula Background Shader
// Creates animated volumetric fog with layered fractal brownian motion

#define PI 3.14159265

// Classic Perlin noise (3D implementation)
vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

vec4 taylorInvSqrt(vec4 r) {
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v) {
  vec2 uv = vec2(v.x + v.y * 0.5, v.y);
  vec3 iuv = floor(vec3(uv, v.z));
  vec3 suv = fract(vec3(uv, v.z));

  uv = iuv.xy + vec2(iuv.z * 38.0, iuv.z * 63.0);

  vec4 g4a = texture(permutationTexture, (uv + 0.5) / 256.0);
  vec4 g4b = texture(permutationTexture, (uv + vec2(1.0, 0.0) + 0.5) / 256.0);
  vec4 g4c = texture(permutationTexture, (uv + vec2(0.0, 1.0) + 0.5) / 256.0);
  vec4 g4d = texture(permutationTexture, (uv + vec2(1.0) + 0.5) / 256.0);

  // Simple hash-based noise for compatibility
  return fract(sin(vec4(
    dot(iuv, vec3(73.156, 214.814, 129.325)),
    dot(iuv + vec3(1, 0, 0), vec3(73.156, 214.814, 129.325)),
    dot(iuv + vec3(0, 1, 0), vec3(73.156, 214.814, 129.325)),
    dot(iuv + vec3(1, 1, 0), vec3(73.156, 214.814, 129.325))
  )) * 43758.5453) * 2.0 - 1.0;
}

// Improved Perlin noise
float perlin(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  vec3 u = f * f * (3.0 - 2.0 * f);

  float n000 = snoise(i + vec3(0, 0, 0));
  float n100 = snoise(i + vec3(1, 0, 0));
  float n010 = snoise(i + vec3(0, 1, 0));
  float n110 = snoise(i + vec3(1, 1, 0));
  float n001 = snoise(i + vec3(0, 0, 1));
  float n101 = snoise(i + vec3(1, 0, 1));
  float n011 = snoise(i + vec3(0, 1, 1));
  float n111 = snoise(i + vec3(1, 1, 1));

  float nx00 = mix(n000, n100, u.x);
  float nx10 = mix(n010, n110, u.x);
  float nx0 = mix(nx00, nx10, u.y);

  float nx01 = mix(n001, n101, u.x);
  float nx11 = mix(n011, n111, u.x);
  float nx1 = mix(nx01, nx11, u.y);

  return mix(nx0, nx1, u.z);
}

// Fractional Brownian Motion
float fbm(vec3 p) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  float maxValue = 0.0;

  for (int i = 0; i < 6; i++) {
    value += amplitude * perlin(p * frequency);
    maxValue += amplitude;
    amplitude *= 0.5;
    frequency *= 2.0;
  }

  return value / maxValue;
}

void main() {
  vec2 uv = vUv;
  
  // Mouse parallax for subtle interactivity
  vec3 pos = vec3(uv * 2.0 - 1.0, time * 0.1 + mousePosition.y * 0.5);
  
  // Layer multiple FBM calls for complex nebula
  float nebula = fbm(pos * 2.0);
  nebula += 0.5 * fbm(pos * 4.0 + vec3(time * 0.05, 0, 0));
  nebula += 0.25 * fbm(pos * 8.0 - vec3(0, time * 0.03, 0));
  
  nebula = smoothstep(0.2, 0.8, nebula);
  
  // Color shift between deep violet and near-black
  vec3 color1 = vec3(0.1, 0.05, 0.2); // Deep violet
  vec3 color2 = vec3(0.02, 0.01, 0.05); // Near black
  
  // Slow color shift
  float colorShift = sin(time * 0.05) * 0.5 + 0.5;
  vec3 baseColor = mix(color1, color2, colorShift);
  
  // Final color with nebula influence
  vec3 finalColor = baseColor * (0.5 + nebula * 0.5);
  
  // Add subtle stars
  float stars = 0.0;
  for(int i = 0; i < 3; i++) {
    vec3 starPos = vec3(sin(float(i) * 234.234) * 2.0, 
                       cos(float(i) * 543.543) * 2.0, 
                       float(i) * 0.5);
    float star = 1.0 / distance(pos, starPos + vec3(time * 0.02 * float(i)));
    stars += pow(star, 3.0) * 0.1;
  }
  
  finalColor += stars;
  
  gl_FragColor = vec4(finalColor, 1.0);
}

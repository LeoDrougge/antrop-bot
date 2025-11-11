'use client';

export default function Sandbox() {
  return (
    <main style={{ backgroundColor: 'var(--app_background)' }} className="min-h-screen">
      <div className="container mx-auto px-6 py-20 max-w-5xl">

        {/* Typography Showcase */}
        <div className="mb-16">
          <h1 className="header-antrop-lg mb-8" style={{ color: 'var(--text-regular)' }}>
            Antrop Design System
          </h1>

          <div className="space-y-6">
            <div>
              <p className="header-sm mb-2" style={{ color: 'var(--text-muted)' }}>
                Header Large Example
              </p>
              <h2 className="header-antrop-lg" style={{ color: 'var(--text-regular)' }}>
                Typography & Colors
              </h2>
            </div>

            <div>
              <p className="header-sm mb-2" style={{ color: 'var(--text-muted)' }}>
                Header Small Example
              </p>
              <h3 className="header-sm" style={{ color: 'var(--text-regular)' }}>
                Section Heading
              </h3>
            </div>

            <div>
              <p className="header-sm mb-2" style={{ color: 'var(--text-muted)' }}>
                Body Text Example
              </p>
              <p className="text-antrop-regular" style={{ color: 'var(--text-regular)' }}>
                Detta är en exempeltext som visar hur body text ser ut med Martian Mono-fonten.
                Notera line-height på 160% som ger bra läsbarhet och letter-spacing på -0.64px
                för en tät men läsbar text.
              </p>
            </div>
          </div>
        </div>

        {/* Color Palette */}
        <div className="mb-16">
          <h2 className="header-sm mb-6" style={{ color: 'var(--text-regular)' }}>
            Color Palette
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div
                className="h-24 rounded-lg mb-2"
                style={{ backgroundColor: 'var(--brand_dark)' }}
              />
              <p className="text-antrop-regular" style={{ color: 'var(--text-regular)' }}>
                brand_dark
              </p>
              <p className="text-antrop-regular" style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                #003535
              </p>
            </div>

            <div>
              <div
                className="h-24 rounded-lg mb-2"
                style={{ backgroundColor: 'var(--brand_midtone)' }}
              />
              <p className="text-antrop-regular" style={{ color: 'var(--text-regular)' }}>
                brand_midtone
              </p>
              <p className="text-antrop-regular" style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                #195858
              </p>
            </div>

            <div>
              <div
                className="h-24 rounded-lg mb-2"
                style={{ backgroundColor: 'var(--brand_muted)' }}
              />
              <p className="text-antrop-regular" style={{ color: 'var(--text-regular)' }}>
                brand_muted
              </p>
              <p className="text-antrop-regular" style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                #467877
              </p>
            </div>

            <div>
              <div
                className="h-24 rounded-lg mb-2"
                style={{ backgroundColor: 'var(--brand_light)' }}
              />
              <p className="text-antrop-regular" style={{ color: 'var(--text-regular)' }}>
                brand_light
              </p>
              <p className="text-antrop-regular" style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                #AFDDD9
              </p>
            </div>
          </div>
        </div>

        {/* Semantic Colors in Use */}
        <div className="mb-16">
          <h2 className="header-sm mb-6" style={{ color: 'var(--text-regular)' }}>
            Semantic Colors
          </h2>

          <div
            className="p-6 mb-4 svg-border"
            style={{ backgroundColor: 'var(--surface_mid)' }}
          >
            <h3 className="header-sm mb-3" style={{ color: 'var(--text-regular)' }}>
              Surface Card Example
            </h3>
            <p className="text-antrop-regular mb-3" style={{ color: 'var(--text-regular)' }}>
              Detta är ett kort som använder surface_mid som bakgrund och text-regular för primär text.
            </p>
            <p className="text-antrop-regular" style={{ color: 'var(--text-muted)' }}>
              Denna text använder text-muted för mindre viktig information.
            </p>
          </div>

          <div
            className="p-6 svg-border"
            style={{ backgroundColor: 'var(--brand_dark)' }}
          >
            <h3 className="header-sm mb-3" style={{ color: 'var(--text-regular)' }}>
              Background Color Example
            </h3>
            <p className="text-antrop-regular" style={{ color: 'var(--text-regular)' }}>
              Detta kort har samma färg som app_background för att visa kontrasten.
            </p>
          </div>
        </div>

        {/* All Text Styles */}
        <div>
          <h2 className="header-sm mb-6" style={{ color: 'var(--text-regular)' }}>
            Text Style Reference
          </h2>

          <div className="space-y-6">
            <div>
              <p className="text-antrop-regular mb-1" style={{ color: 'var(--text-muted)' }}>
                .header-antrop-lg
              </p>
              <p className="header-antrop-lg" style={{ color: 'var(--text-regular)' }}>
                The Quick Brown Fox
              </p>
              <p className="text-antrop-regular" style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                39px / 400 / -1.56px / UPPERCASE
              </p>
            </div>

            <div>
              <p className="text-antrop-regular mb-1" style={{ color: 'var(--text-muted)' }}>
                .header-sm
              </p>
              <p className="header-sm" style={{ color: 'var(--text-regular)' }}>
                The Quick Brown Fox Jumps Over
              </p>
              <p className="text-antrop-regular" style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                16px / 500 / -0.64px / 150% / UPPERCASE
              </p>
            </div>

            <div>
              <p className="text-antrop-regular mb-1" style={{ color: 'var(--text-muted)' }}>
                .text-antrop-regular
              </p>
              <p className="text-antrop-regular" style={{ color: 'var(--text-regular)' }}>
                The quick brown fox jumps over the lazy dog. This is body text with proper line-height and letter-spacing for optimal readability.
              </p>
              <p className="text-antrop-regular" style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                16px / 400 / -0.64px / 160%
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

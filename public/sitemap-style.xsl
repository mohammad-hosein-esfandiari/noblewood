<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:output method="html" indent="yes"/>

  <xsl:template match="/">
    <html>
      <head>
        <title>Sitemap</title>
        <style>
          body { font-family: Arial, sans-serif; background: #f4f4f4; }
          h1 { color: #333; }
          ul { list-style: none; padding-left: 0; }
          li { padding: 5px 0; }
          a { text-decoration: none; color: #0070f3; }
          a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <h1>Sitemap</h1>
        <ul>
          <xsl:for-each select="urlset/url">
            <li>
              <a href="{loc}">
                <xsl:value-of select="loc"/>
              </a>
              <small> (Last modified: <xsl:value-of select="lastmod"/>)</small>
            </li>
          </xsl:for-each>
        </ul>
      </body>
    </html>
  </xsl:template>

</xsl:stylesheet>

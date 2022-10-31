import WebViewer from '@pdftron/pdfjs-express-viewer';
import React, {useRef, useEffect} from 'react';
import {StyleSheet} from 'react-native';

export const PdfViewer = props => {
  const viewer = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    WebViewer(
      {
        path: '/pdflib',
        initialDoc: props.url,
        // Those are safe to be exposed as they work only on the domains specified in PDFTron's dashboard
        licenseKey: window.location.host.includes('czerwoniakplus.pages.dev')
          ? 'NddW48Vf1XNr0JywBNGR'
          : '6wkqc5JwlbdXT1GJM02y',
        disabledElements: [
          'leftPanelButton',
          'viewControlsButton',
          'panToolButton',
          'selectToolButton',
          'searchButton',
          'downloadButton',
          'printButton',
          'languageButton',
          'modeButton',
          'themeChangeButton',
          'contextMenuPopup',
        ],
        enabledElements: ['zoomOutButton', 'zoomInButton'],
      },
      viewer.current,
    ).then(instance => {
      instanceRef.current = instance;
      instance.UI.setTheme(props.theme === 'light' ? 'light' : 'dark');
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (instanceRef.current) {
      instanceRef.current.UI.setTheme(props.theme);
    }
  }, [props.theme]);

  useEffect(() => {
    if (instanceRef.current) {
      instanceRef.current.UI.loadDocument(props.url);
    }
  }, [props.url]);

  return <div style={styles.viewer} ref={viewer} />;
};

const styles = StyleSheet.create({
  viewer: {
    height: '100%',
    width: '100%',
  },
});

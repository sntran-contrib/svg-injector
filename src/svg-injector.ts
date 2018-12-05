import injectElement from './inject-element'
import { DoneCallback, Errback } from './types'

interface IOptionalArgs {
  done?: DoneCallback
  each?: Errback
  evalScripts?: 'always' | 'once' | 'never'
  pngFallback?: string
  renumerateIRIElements?: boolean
}

/**
 * :NOTE: We are using get/setAttribute with SVG because the SVG DOM spec
 * differs from HTML DOM and can return other unexpected object types when
 * trying to directly access svg properties. ex: "className" returns a
 * SVGAnimatedString with the class value found in the "baseVal" property,
 * instead of simple string like with HTML Elements.
 */
const SVGInjector = (
  elements: NodeListOf<HTMLElement> | HTMLElement | null,
  {
    done = () => undefined,
    each = () => undefined,
    evalScripts = 'never',
    pngFallback = '',
    renumerateIRIElements = true
  }: IOptionalArgs = {}
) => {
  if (elements instanceof NodeList) {
    let elementsLoaded = 0
    for (const element of elements) {
      injectElement(
        element,
        (error: Error | null, svg?: SVGSVGElement) => {
          each(error, svg)
          if (
            elements instanceof NodeList &&
            elements.length === ++elementsLoaded
          ) {
            done(elementsLoaded)
          }
        },
        {
          evalScripts,
          pngFallback,
          renumerateIRIElements
        }
      )
    }
    return
  }

  if (elements) {
    injectElement(
      elements,
      (error: Error | null, svg?: SVGSVGElement) => {
        each(error, svg)
        done(1)
        elements = null
      },
      {
        evalScripts,
        pngFallback,
        renumerateIRIElements
      }
    )
    return
  }

  done(0)
}

export default SVGInjector

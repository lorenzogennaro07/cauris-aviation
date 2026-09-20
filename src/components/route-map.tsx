import type {SiteContent} from "@/content/types";
export function RouteMap({content}:{content:SiteContent}){
 return <svg className="route-map" viewBox="0 0 700 700" role="img" aria-label={content.map.accessible}>
 <path className="sicily-coast" d="M70 287 C120 290 155 280 191 270 L229 263 265 254 299 257 329 250 356 245 376 248 401 237 421 229 449 218 467 204 481 193 491 194 489 210 479 236 466 258 451 280 438 314 425 345 417 371 413 400 401 424 395 444 399 462 403 480 397 502 407 526 401 550 387 568 373 575 370 595 352 612 343 635"/>
 <g className="map-islands"><path d="M320 147 326 141 333 145 335 155 330 166 326 172 320 168 317 159Z M310 180 316 176 322 180 326 192 322 202 315 205 309 197Z M291 135 299 131 305 136 305 144 300 149 294 146Z M372 111 377 109 380 114 376 118Z M409 61 415 54 422 60 419 67 413 70Z M226 151 237 146 243 150 239 155 228 158Z M198 167 202 161 209 163 211 169 204 174Z"/></g>
 <path className="route-line" d="M399 462 L329 166" pathLength="1"/>
 <g className="map-origin"><circle cx="399" cy="462" r="4"/><text x="417" y="468">Catania</text></g>
 <g className="map-destination"><circle cx="329" cy="166" r="4"/><text x="348" y="169">Lipari</text></g>
 </svg>;
}

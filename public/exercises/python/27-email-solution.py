# =================================================
# Module 27 : Email avec Python
# SOLUTION - Fichier corrigé
# =================================================

import re
from datetime import date


# Exercice 1 : Construire des messages MIME
# --------------------------------------------
def creer_message_simple(expediteur, destinataire, sujet, corps):
    """Crée un message email simple (texte brut)."""
    if not sujet or not sujet.strip():
        raise ValueError("Le sujet ne peut pas être vide")
    if "@" not in expediteur:
        raise ValueError(f"Adresse expéditeur invalide : {expediteur}")
    if "@" not in destinataire:
        raise ValueError(f"Adresse destinataire invalide : {destinataire}")

    return {
        "From": expediteur,
        "To": destinataire,
        "Subject": sujet,
        "Content-Type": "text/plain",
        "Body": corps,
        "Date": str(date.today())
    }


def creer_message_html(expediteur, destinataire, sujet, html, texte_fallback=None):
    """Crée un message email HTML avec fallback texte."""
    msg = creer_message_simple(expediteur, destinataire, sujet, "")

    msg["Content-Type"] = "multipart/alternative"
    msg["Body-HTML"] = html

    if texte_fallback:
        msg["Body-Text"] = texte_fallback
    else:
        # Supprimer les tags HTML pour créer le fallback
        texte = re.sub(r'<[^>]+>', '', html)
        texte = re.sub(r'\s+', ' ', texte).strip()
        msg["Body-Text"] = texte

    msg["Body"] = msg["Body-Text"]

    return msg


def ajouter_piece_jointe(message, nom_fichier, contenu, type_mime="application/octet-stream"):
    """Ajoute une pièce jointe à un message."""
    message["Content-Type"] = "multipart/mixed"

    if "Attachments" not in message:
        message["Attachments"] = []

    message["Attachments"].append({
        "filename": nom_fichier,
        "content": contenu,
        "type": type_mime,
        "size": len(contenu.encode("utf-8")) if isinstance(contenu, str) else len(contenu)
    })

    return message


# Exercice 2 : Simuler un serveur SMTP
# ----------------------------------------
class MockSMTP:
    """Simule un serveur SMTP."""

    COMPTES = {
        "alice@test.com": "password123",
        "bob@test.com": "secret456",
        "admin@test.com": "admin789"
    }

    def __init__(self, host, port=587):
        self.host = host
        self.port = port
        self.connected = True
        self.tls_active = False
        self.authenticated = False
        self.user = None
        self.sent_messages = []
        self.log = []
        self.log.append(f"Connecté à {host}:{port}")

    def ehlo(self):
        if not self.connected:
            raise Exception("Non connecté au serveur")
        self.log.append("EHLO envoyé")

    def starttls(self):
        if not self.connected:
            raise Exception("Non connecté au serveur")
        self.tls_active = True
        self.log.append("TLS activé")

    def login(self, user, password):
        if not self.tls_active:
            raise Exception("TLS doit être activé avant l'authentification")
        if user not in self.COMPTES or self.COMPTES[user] != password:
            raise Exception(f"Identifiants invalides pour {user}")
        self.authenticated = True
        self.user = user
        self.log.append(f"Authentifié comme {user}")

    def send_message(self, msg):
        if not self.authenticated:
            raise Exception("Authentification requise avant l'envoi")
        if not msg.get("From") or not msg.get("To") or not msg.get("Subject"):
            raise Exception("Le message doit contenir From, To et Subject")

        self.sent_messages.append(msg.copy())
        self.log.append(f"Email envoyé à {msg['To']} : {msg['Subject']}")

    def quit(self):
        self.connected = False
        self.authenticated = False
        self.log.append("Connexion fermée")

    def __enter__(self):
        return self

    def __exit__(self, *args):
        if self.connected:
            self.quit()


# Exercice 3 : Templates d'emails
# -----------------------------------
def creer_template(nom, sujet_template, corps_template):
    """Crée un template d'email réutilisable."""
    # Trouver toutes les variables {{...}}
    pattern = r'\{\{(\w+)\}\}'
    vars_sujet = set(re.findall(pattern, sujet_template))
    vars_corps = set(re.findall(pattern, corps_template))

    return {
        "nom": nom,
        "sujet": sujet_template,
        "corps": corps_template,
        "variables": vars_sujet | vars_corps
    }


def appliquer_template(template, variables):
    """Applique des variables à un template."""
    sujet = template["sujet"]
    corps = template["corps"]

    variables_manquantes = set()

    for var in template["variables"]:
        placeholder = "{{" + var + "}}"
        if var in variables:
            sujet = sujet.replace(placeholder, str(variables[var]))
            corps = corps.replace(placeholder, str(variables[var]))
        else:
            variables_manquantes.add(var)

    return {
        "sujet": sujet,
        "corps": corps,
        "variables_manquantes": variables_manquantes
    }


def envoyer_email_masse(smtp, template, destinataires, variables_communes=None):
    """Envoie un email personnalisé à une liste de destinataires."""
    envoyes = 0
    erreurs = []

    for dest in destinataires:
        try:
            # Fusionner les variables communes et spécifiques
            variables = dict(variables_communes or {})
            variables.update(dest)

            # Appliquer le template
            resultat = appliquer_template(template, variables)

            # Créer et envoyer le message
            msg = creer_message_simple(
                smtp.user,
                dest["email"],
                resultat["sujet"],
                resultat["corps"]
            )
            smtp.send_message(msg)
            envoyes += 1
        except Exception as e:
            erreurs.append({"email": dest.get("email", "?"), "erreur": str(e)})

    return {
        "envoyes": envoyes,
        "erreurs": erreurs
    }


# Exercice 4 : Parser des emails bruts
# ----------------------------------------
def parser_email_brut(texte_brut):
    """Parse un email brut en format texte."""
    # Séparer les en-têtes du corps (ligne vide)
    parties = texte_brut.split("\n\n", 1)
    header_text = parties[0]
    body = parties[1] if len(parties) > 1 else ""

    # Parser les en-têtes
    headers = {}
    current_key = None

    for ligne in header_text.split("\n"):
        if ":" in ligne and not ligne.startswith(" "):
            key, value = ligne.split(":", 1)
            key = key.strip()
            value = value.strip()
            headers[key] = value
            current_key = key
        elif current_key and ligne.startswith(" "):
            # Ligne continuée
            headers[current_key] += " " + ligne.strip()

    has_attachment = "multipart" in headers.get("Content-Type", "").lower()

    return {
        "headers": headers,
        "body": body.strip(),
        "has_attachment": has_attachment
    }


def extraire_adresses(texte):
    """Extrait toutes les adresses email d'un texte."""
    pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
    adresses = re.findall(pattern, texte)
    return sorted(set(adresses))


# Exercice 5 : Système de notifications
# -----------------------------------------
class NotificationManager:
    """Gestionnaire de notifications par email."""

    def __init__(self, smtp):
        self.templates = {}
        self.abonnes = {}
        self.historique = []
        self.smtp = smtp

    def ajouter_template(self, nom, sujet, corps):
        self.templates[nom] = creer_template(nom, sujet, corps)

    def ajouter_abonne(self, email, nom, preferences=None):
        if preferences is None:
            preferences = {"info", "alerte", "rapport"}
        self.abonnes[email] = {
            "nom": nom,
            "preferences": preferences
        }

    def retirer_abonne(self, email):
        if email in self.abonnes:
            del self.abonnes[email]

    def envoyer_notification(self, type_notif, template_nom, variables=None):
        if template_nom not in self.templates:
            return {"type": type_notif, "envoyes": 0, "destinataires": [],
                    "erreurs": [{"email": "", "erreur": f"Template '{template_nom}' introuvable"}]}

        template = self.templates[template_nom]
        destinataires = []
        erreurs = []
        envoyes = 0

        for email, info in self.abonnes.items():
            if type_notif in info["preferences"]:
                try:
                    # Variables spécifiques à l'abonné
                    vars_perso = dict(variables or {})
                    vars_perso["nom"] = info["nom"]
                    vars_perso["email"] = email

                    resultat = appliquer_template(template, vars_perso)

                    msg = creer_message_simple(
                        self.smtp.user,
                        email,
                        resultat["sujet"],
                        resultat["corps"]
                    )
                    self.smtp.send_message(msg)
                    destinataires.append(email)
                    envoyes += 1

                    # Historique
                    self.historique.append({
                        "type": type_notif,
                        "template": template_nom,
                        "destinataire": email,
                        "sujet": resultat["sujet"],
                        "date": str(date.today())
                    })
                except Exception as e:
                    erreurs.append({"email": email, "erreur": str(e)})

        return {
            "type": type_notif,
            "envoyes": envoyes,
            "destinataires": destinataires,
            "erreurs": erreurs
        }

    def obtenir_historique(self, email=None, type_notif=None):
        resultats = self.historique
        if email:
            resultats = [h for h in resultats if h["destinataire"] == email]
        if type_notif:
            resultats = [h for h in resultats if h["type"] == type_notif]
        return resultats


# ======================
# Tests
# ======================
if __name__ == "__main__":
    print("=" * 50)
    print("TEST EXERCICE 1 : Messages MIME")
    print("=" * 50)

    msg = creer_message_simple(
        "alice@test.com", "bob@test.com",
        "Test", "Bonjour Bob !"
    )
    print(f"  From: {msg['From']}")
    print(f"  To: {msg['To']}")
    print(f"  Subject: {msg['Subject']}")
    print(f"  Date: {msg['Date']}")

    msg_html = creer_message_html(
        "alice@test.com", "bob@test.com",
        "Rapport", "<h1>Titre</h1><p>Contenu du rapport</p>"
    )
    print(f"  HTML Content-Type: {msg_html['Content-Type']}")
    print(f"  Body-Text: {msg_html['Body-Text']}")

    msg_pj = creer_message_simple("alice@test.com", "bob@test.com", "Données", "Voir PJ")
    ajouter_piece_jointe(msg_pj, "data.csv", "nom,age\nAlice,30\nBob,25")
    print(f"  PJ Content-Type: {msg_pj['Content-Type']}")
    print(f"  Nb PJ: {len(msg_pj['Attachments'])}")
    print(f"  PJ: {msg_pj['Attachments'][0]['filename']} ({msg_pj['Attachments'][0]['size']} octets)")

    # Test validation
    try:
        creer_message_simple("invalide", "bob@test.com", "Test", "Corps")
    except ValueError as e:
        print(f"  Validation OK : {e}")

    print("\n" + "=" * 50)
    print("TEST EXERCICE 2 : MockSMTP")
    print("=" * 50)

    with MockSMTP("smtp.test.com", 587) as smtp:
        smtp.ehlo()
        smtp.starttls()
        smtp.login("alice@test.com", "password123")
        smtp.send_message(msg)
        print(f"  Messages envoyés : {len(smtp.sent_messages)}")
        print(f"  Log :")
        for entry in smtp.log:
            print(f"    → {entry}")

    # Test erreur d'auth
    try:
        smtp2 = MockSMTP("smtp.test.com", 587)
        smtp2.ehlo()
        smtp2.starttls()
        smtp2.login("alice@test.com", "mauvais_mdp")
    except Exception as e:
        print(f"  Auth échouée : {e}")

    print("\n" + "=" * 50)
    print("TEST EXERCICE 3 : Templates")
    print("=" * 50)

    tpl = creer_template(
        "bienvenue",
        "Bienvenue {{prenom}} !",
        "Bonjour {{prenom}} {{nom}},\nBienvenue sur {{site}}."
    )
    print(f"  Variables : {tpl['variables']}")

    resultat = appliquer_template(tpl, {"prenom": "Alice", "nom": "Martin", "site": "MemoCode"})
    print(f"  Sujet : {resultat['sujet']}")
    print(f"  Corps : {resultat['corps']}")
    print(f"  Manquantes : {resultat['variables_manquantes']}")

    # Test envoi en masse
    with MockSMTP("smtp.test.com", 587) as smtp:
        smtp.ehlo()
        smtp.starttls()
        smtp.login("admin@test.com", "admin789")

        res = envoyer_email_masse(smtp, tpl, [
            {"email": "alice@test.com", "prenom": "Alice", "nom": "Martin"},
            {"email": "bob@test.com", "prenom": "Bob", "nom": "Dupont"},
        ], {"site": "MemoCode"})
        print(f"  Envoyés en masse : {res['envoyes']}")
        print(f"  Erreurs : {res['erreurs']}")

    print("\n" + "=" * 50)
    print("TEST EXERCICE 4 : Parser email brut")
    print("=" * 50)

    email_brut = """From: alice@example.com
To: bob@example.com
Subject: Reunion demain
Date: 2024-01-15
Content-Type: text/plain

Bonjour Bob,

N'oublie pas la reunion demain a 14h.
Salle B203.

Cordialement,
Alice"""

    parsed = parser_email_brut(email_brut)
    print(f"  Headers : {parsed['headers']}")
    print(f"  Body : {parsed['body'][:60]}...")
    print(f"  Has attachment : {parsed['has_attachment']}")

    adresses = extraire_adresses(
        "Contact alice@test.com ou bob@test.com, cc: admin@test.com et alice@test.com"
    )
    print(f"  Adresses uniques : {adresses}")

    print("\n" + "=" * 50)
    print("TEST EXERCICE 5 : Notifications")
    print("=" * 50)

    smtp = MockSMTP("smtp.test.com", 587)
    smtp.ehlo()
    smtp.starttls()
    smtp.login("admin@test.com", "admin789")

    manager = NotificationManager(smtp)
    manager.ajouter_template(
        "alerte_systeme",
        "ALERTE : {{message}}",
        "Bonjour {{nom}},\n\nAlerte système : {{message}}\nSévérité : {{severite}}"
    )
    manager.ajouter_template(
        "info_generale",
        "Info : {{titre}}",
        "Bonjour {{nom}},\n\n{{contenu}}"
    )
    manager.ajouter_abonne("alice@test.com", "Alice", {"info", "alerte"})
    manager.ajouter_abonne("bob@test.com", "Bob", {"info"})
    manager.ajouter_abonne("claire@test.com", "Claire", {"alerte", "rapport"})

    # Envoyer une alerte (Alice et Claire)
    res = manager.envoyer_notification("alerte", "alerte_systeme", {
        "message": "CPU > 90%",
        "severite": "haute"
    })
    print(f"  Alerte - Envoyés : {res['envoyes']}")
    print(f"  Alerte - Destinataires : {res['destinataires']}")

    # Envoyer une info (Alice et Bob)
    res2 = manager.envoyer_notification("info", "info_generale", {
        "titre": "Mise à jour v2.0",
        "contenu": "Nouvelle version disponible."
    })
    print(f"  Info - Envoyés : {res2['envoyes']}")
    print(f"  Info - Destinataires : {res2['destinataires']}")

    # Historique
    hist = manager.obtenir_historique(email="alice@test.com")
    print(f"  Historique Alice : {len(hist)} notifications")
    for h in hist:
        print(f"    → [{h['type']}] {h['sujet']}")

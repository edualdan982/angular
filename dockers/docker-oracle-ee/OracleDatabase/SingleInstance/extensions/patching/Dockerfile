# LICENSE UPL 1.0
#
# Copyright (c) 1982-2020 Oracle and/or its affiliates. All rights reserved.
#
# ORACLE DOCKERFILES PROJECT
# --------------------------
# This is the Dockerfile for Oracle Database with patching support
#
# REQUIREMETNS FOR THIS IMAGE
# ----------------------------------
#
#
# HOW TO BUILD THIS IMAGE
# -----------------------
#
# Run:
#      $ docker build -t <extended_image_name> . --build-arg BASE_IMAGE=oracle/database:18.3.0-ee
#
# Pull base image
# ---------------
ARG BASE_IMAGE=oracle/database:19.3.0-ee
FROM ${BASE_IMAGE} as patching

# Environment variables required for this build (do NOT change)
# -------------------------------------------------------------
ENV HOST_PATCH_DIR="patches" \
    PATCH_DIR=/opt/install/patches \
    PATCH_DB_BINARIES_FILE="patchDBBinaries.sh"

# Copy DB patches
COPY --chown=oracle:dba $HOST_PATCH_DIR $PATCH_DB_BINARIES_FILE $PATCH_DIR/

# Apply DB Patch
RUN chmod ug+x $PATCH_DIR/*.sh && \
    sync && \
    $PATCH_DIR/$PATCH_DB_BINARIES_FILE && \
    rm -rf $PATCH_DIR/* $ORACLE_HOME/.patch_storage


## New stage for minimal layer size
FROM ${BASE_IMAGE}
ENV DATAPATCH_FILE="runDatapatch.sh" \
    LSPATCHES_FILE="savePatchSummary.sh"

# Extn name
ARG EXTENSION_NAME="patching"

# Copying patched oracle_base from previous layer
COPY --chown=oracle:dba --from=patching $ORACLE_BASE $ORACLE_BASE

# Copy script to run datapatch
COPY --chown=oracle:dba $DATAPATCH_FILE $ORACLE_BASE/scripts/startup
RUN chmod ug+x $ORACLE_BASE/scripts/startup/*.sh && sync

# Copy script to run lspatches
COPY --chown=oracle:dba $LSPATCHES_FILE $ORACLE_BASE/scripts/setup
RUN chmod ug+x $ORACLE_BASE/scripts/setup/*.sh && sync

# backup origin runOracle
RUN mv "$ORACLE_BASE/$RUN_FILE" "$ORACLE_BASE/$RUN_FILE.$EXTENSION_NAME"

# Copy updated runOracle.sh
COPY  --chown=oracle:dba $RUN_FILE $ORACLE_BASE/
RUN chmod ug+x $ORACLE_BASE/*.sh && sync

# Append a call to main runOracle
RUN echo -e "\n. $ORACLE_BASE/$RUN_FILE.$EXTENSION_NAME" >> "$ORACLE_BASE/$RUN_FILE"
